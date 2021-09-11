import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.getUser, (state) => state),
  on(AuthActions.authenticated, (state, { user }) => ({ ...state, user })),
  on(AuthActions.notAuthenticated, () => ({ ...initialState })),
  on(AuthActions.error, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
