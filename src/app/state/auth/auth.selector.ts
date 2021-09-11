import { createSelector } from '@ngrx/store';
import { StoreRootState } from './../state.reducers';
import { User } from './auth.model';
import { State } from './auth.reducer';

export const selectState = (state: StoreRootState) => state.auth;

export const selectUser = createSelector(
  selectState,
  (auth: State) => auth.user
);
