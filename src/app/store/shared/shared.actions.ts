import {createAction, props} from "@ngrx/store";

export const setLoadingSpinner = createAction(
  '[shared state] set loading spinner',
  props<{status: boolean}>()
)
