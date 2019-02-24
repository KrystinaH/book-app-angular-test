import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

constructor(){
  var config = {
    apiKey: "AIzaSyAiFx_gW4xqgE-Y0juQ9oKqqhqjRIxMwls",
    authDomain: "application-livres-37876.firebaseapp.com",
    databaseURL: "https://application-livres-37876.firebaseio.com",
    projectId: "application-livres-37876",
    storageBucket: "application-livres-37876.appspot.com",
    messagingSenderId: "287777857101"
  };
  firebase.initializeApp(config);
}

}
