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
  props<{ user: User }>()
)

export const signupStart = createAction(
  '[auth page] signup start',
  props<{
    email: string;
    password: string
  }>()
)

export const signupSuccess = createAction(
  '[auth page] signup success',
  props<{ user: User }>()
)
