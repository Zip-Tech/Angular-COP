import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storeLogger } from 'ngrx-store-logger';

import * as fromRouter from '@ngrx/router-store';
import * as AuthReducer from './auth/auth.reducer';

import { environment } from 'src/environments/environment';

export interface StoreRootState {
  auth: AuthReducer.State;
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<StoreRootState> = {
  auth: AuthReducer.reducer,
  router: routerReducer,
};

export function logger(reducer: ActionReducer<StoreRootState>): any {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
