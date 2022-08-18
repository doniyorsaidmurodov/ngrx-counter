import {createReducer, on} from "@ngrx/store";
import {initialState} from "./counter.state";
import {changeName, customInput, decrement, increment, reset} from "./counter.actions";

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1
    }
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1
    }
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0
    }
  }),
  on(customInput, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count
    }
  }),
  on(changeName, (state) => {
    return {
      ...state,
      name: 'Name was changed'
    }
  })
  )

export function counterReducer(state, action) {
  return _counterReducer(state, action)
}
