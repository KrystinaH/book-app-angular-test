import { Injectable } from '@angular/core';
import {Book} from "../models/Book.model";
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor(private router: Router) {
      this.getBooks();
  }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }

  getBooks(){
    firebase.database().ref('/books')
        .on('value', (data: DataSnapshot)=>{
          this.books = data.val() ? data.val() : [];
          this.emitBooks();
        });
  }

  getSingleBook(id: number){
      return new Promise(
          (resolve, reject)=>{
              firebase.database().ref('/books/' + id).once('value').then(
                  (data: DataSnapshot)=>{
                      resolve(data.val());
                  },
                  (error)=>{
                      reject(error);
                  }
              );
          }
      );
  }

  createNewBook(newBook: Book){
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book){
      if(book.photo){
          const storageRef = firebase.storage().refFromURL(book.photo);
          storageRef.delete().then(
              ()=>{
                  console.log('Photo supprimée');
              }
          ).catch(
              (error)=>{
                  console.log('Fichier non trouvé: ' + error);
              }
          );
      }
    const bookIndex = this.books.findIndex(
        (bookElement)=>{
          if(bookElement === book){
            return true;
          }
        }
    );
    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File){
      return new Promise(
          (resolve, reject)=>{
              const uniqueFileName = Date.now().toString();
              const upload = firebase.storage().ref()
                  .child('images/' + uniqueFileName + file.name).put(file);
              upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                  ()=>{
                    console.log('Chargement...');
                  },
                  (error)=>{
                      console.log('Erreur de chargement: ' + error);
                      reject();
                  },
                  ()=>{
                    resolve(upload.snapshot.ref.getDownloadURL());
                  });
          }
      );
  }
}
