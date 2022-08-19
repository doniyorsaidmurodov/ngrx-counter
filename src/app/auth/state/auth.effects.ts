import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {loginStart, loginSuccess} from "./auth.actions";
import {exhaustMap, map} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setLoadingSpinner} from "../../store/shared/shared.actions";

@Injectable()

export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthService, private store: Store<AppState>) {
    // this.login$.subscribe(next => {
    //   console.log('next: ', next)
    // })
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.auth.login(action.email, action.password).pipe(
          map(data => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const user = this.auth.formatUser(data);
            return loginSuccess({user});
          })
        )
      })
    )
  })
}
