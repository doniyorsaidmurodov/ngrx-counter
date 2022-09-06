import {SHARED_STATE_NAME} from "./shared/shared.selector";
import {SharedState} from "./shared/shared.state";
import {sharedReducer} from "./shared/shared.reducer";
import {AUTH_STATE_NAME} from "../auth/state/auth.selector";
import {AuthState} from "../auth/state/auth.state";
import {authReducer} from "../auth/state/auth.reducer";
import {routerReducer, RouterReducerState} from "@ngrx/router-store";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [AUTH_STATE_NAME]: authReducer,
  router: routerReducer
}
