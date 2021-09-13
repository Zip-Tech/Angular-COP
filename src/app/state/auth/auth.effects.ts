import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';

import { User } from './auth.model';

import * as AuthActions from './auth.actions';
import { AuthService } from '@firebase/auth/auth.service';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GET_USER),
      mergeMap(() =>
        this.authService.user$.pipe(
          switchMap((auth) => this.authService.userDoc$),
          map((user: User) => {
            if (user) {
              return AuthActions.authenticated({ user });
            } else {
              return AuthActions.notAuthenticated();
            }
          }),
          catchError((error) => of(AuthActions.error({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
