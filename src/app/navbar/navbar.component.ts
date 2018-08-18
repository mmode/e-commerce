import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: firebase.User;

  constructor(private afs: AngularFireAuth) { }

  ngOnInit() {
    this.afs.authState.subscribe(user => this.user = user);
  }

  logout() {
    this.afs.auth.signOut();
  }
}
