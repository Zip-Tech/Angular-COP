import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreRootState } from './state/state.reducers';

import * as AuthActions from '@state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-poc';

  constructor(private store: Store<StoreRootState>) {}

  ngOnInit() {
    this.dispatchUser();
  }

  dispatchUser() {
    this.store.dispatch(AuthActions.getUser());
  }
}
