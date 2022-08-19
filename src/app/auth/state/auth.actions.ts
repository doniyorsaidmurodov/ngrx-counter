import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const loginStart = createAction(
  '[auth page] login start',
  props<{
    email: string;
    password: string
  }>()
)

export const loginSuccess = createAction(
  '[auth page] login success',
  props<{user: User}>()
)

export const loginFail = createAction(
  '[auth page] login fail'
)
