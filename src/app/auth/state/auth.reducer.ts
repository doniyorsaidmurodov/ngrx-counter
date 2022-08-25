import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {autoLogout, loginSuccess, signupSuccess} from "./auth.actions";

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),
  on(autoLogout, (state, action) => {
    return {
      ...state,
      user: null
    }
  })
)

export function authReducer(state, action) {
  return _authReducer(state, action)
}
