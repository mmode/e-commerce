import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afs: AngularFireAuth) { }

  ngOnInit() {
  }

  login() {
    this.afs.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
