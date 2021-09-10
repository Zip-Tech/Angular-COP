import { Injectable, NgZone, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

import { user } from 'rxfire/auth';
import { docData } from 'rxfire/firestore';
import { tap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  db = firebase.firestore();
  authClient = firebase.auth();

  user$: Observable<any>;
  userDoc$: Observable<any>;

  user: any;
  userDoc: any;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private app: ApplicationRef
  ) {
    this.user$ = user(this.authClient).pipe(
      tap((u) => {
        if (u) {
          this.user = u;
        } else {
          this.user = null;
        }
        // this.app.tick();
      })
    );

    this.userDoc$ = this.getUserDoc$('users').pipe(
      tap((u) => {
        if (u) {
          this.userDoc = u;
        }
        // this.app.tick();
      })
    );
  }

  getUserDoc$(col: string) {
    return user(this.authClient).pipe(
      switchMap((u) => {
        return u
          ? docData(firebase.firestore().doc(`${col}/${(u as any).uid}`))
          : of(null);
      })
    );
  }

  signOut() {
    const res = this.authClient.signOut();
    this.ngZone.run(() => this.router.navigate(['login'])).then();
    return of(res);
  }

  get userId() {
    return this.user ? this.user.uid : null;
  }

  async emailSignup(email: string, password: string, username: string) {
    const credential = this.authClient
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user_ref = firebase.firestore().collection('users');
        const data = {
          username,
          email
        };
        user_ref
          .doc(res?.user?.uid)
          .set(data)
          .then(() => {
            console.log('Account created');
          })
          .catch((error) => {
            alert(error);
          });
      });
    return this.loginHandler(credential);
  }

  async emailLogin(email: string, password: string) {
    const credential = this.authClient.signInWithEmailAndPassword(
      email,
      password
    );
    return this.loginHandler(credential);
  }

  async resetPassword(email: string) {
    return this.authClient.sendPasswordResetEmail(email);
  }

  async loginHandler(promise: Promise<any>) {
    let res, serverError;
    try {
      res = await promise;
      this.ngZone.run(() => this.router.navigate(['home'])).then();
    } catch (err) {
      serverError = err;
    }
    return { res, serverError };
  }
}
