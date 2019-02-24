import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from "../models/Book.model";
import { Subscription } from "rxjs";
import { BooksService } from "../services/books.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit() {
    this.bookSubscription = this.booksService.booksSubject.subscribe(
        (books: Book[])=>{
          this.books = books;
        }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onCreate(){
    this.router.navigate(['/books', 'new']);
  }

  onDelete(book: Book){
    this.booksService.removeBook(book);
  }

  onView(id: number){
    this.router.navigate(['/books', id]);
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }
}
