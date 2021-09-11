import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

export const GET_USER = '[Auth] Get User';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';

export const ERROR = '[Auth] Error';

export const getUser = createAction(GET_USER);
export const authenticated = createAction(AUTHENTICATED, props<{ user: User }>());
export const notAuthenticated = createAction(NOT_AUTHENTICATED);
export const error = createAction(ERROR, props<{ error: Error }>());
