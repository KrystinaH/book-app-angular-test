import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { Book } from "../../models/Book.model";
import { BooksService } from "../../services/books.service";

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  books: Book[];
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router) {
    this.books = this.booksService.books;
  }

  ngOnInit() {
    // this.route.params : Observable<Params>
    // Puisque c'est un observable, je peux subscribe dessus.
    // Pour haque mise à jour de `Params` la fonction que je lui donne sera appelé
    this.subscription = this.route.params.subscribe(this.myCustonOnUpdateFunction);
  }

  private myCustonOnUpdateFunction(params: Params) {
    const id = params.id;
    // Ici, j'ai modifié ton code
    // Tu allais chercher l'index d'un objet en ayant déjà récupéré l'objet
    // En effet, `books[id]` te donnais l'objet (ou `undefined` si manquant)
    const book = this.books[id];

    // Ici, je joue avec la définition de `Falsy` en JS
    // Grosso modo, undefined est considéré comme `Faux`
    // Donc, !undefined => true
    // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    if (!book) {
      // Si le livre n'existe pas
      this.router.navigate(['/books']);
      // En utilisant un `early` return ici
      // Je m'assure que le reste du code ne soit pas éxécuté
      // C'est très rare que j'écris if() {} else {}
      // D'avoir le return ici permet d'assuré le même fonctionnement en réduisant l'indentation
      // C'est généralement positif de limité l'indentation de ton code :)
      return;
    }

    // Je ne sais pas si book contient vraiment l'objet du livre
    // Donc j'extrapole un peu sur ton code, mais normalement,
    // Tu as déjà récupéré le livre plus haut.
    // Si ce n'est pas le cas, tu peux simplement remplacer par la methode loadBook(id)
    this.book = book;

    // this.loadBook(id);
  }

  private loadBook(id) {
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
