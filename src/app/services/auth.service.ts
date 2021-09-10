import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authClient = firebase.auth();
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}

  async checkAuthenticated() {
    if (this.authClient.currentUser) {
      this.isAuthenticated.next(true);
    }
    return this.isAuthenticated;
  }

  async login(username: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(username, password);
  }
  async logout(redirect: string) {
    try {
      await this.authClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
