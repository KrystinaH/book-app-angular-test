import { Component, OnInit } from '@angular/core';
import { Book } from "../../models/Book.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { BooksService } from "../../services/books.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  books: Book[];

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) {
    this.books = this.booksService.books;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if(this.books.indexOf(this.books[id]) == -1){
      this.router.navigate(['/books']);
    } else{
      this.book = new Book("", "");
      this.booksService.getSingleBook(+id).then(
          (book: Book)=>{
            this.book = book;
          }
      );
    }
  }

  onBack(){
    this.router.navigate(['/books']);
  }

}
