import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../services/auth.service";
import {autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.actions";
import {catchError, exhaustMap, map, mergeMap, of, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setErrorMessage, setLoadingSpinner} from "../../store/shared/shared.actions";
import {Router} from "@angular/router";

@Injectable()

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {
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
            this.store.dispatch(setErrorMessage({message: ''}));
            const user = this.auth.formatUser(data);
            this.auth.setUserInLocalStorage(user);
            return loginSuccess({user, redirect: true});
          }),
          catchError((error) => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const errorMessage = this.auth.getErrorMessage(error.error.error.message);
            return of(setErrorMessage({message: errorMessage}));
          })
        )
      })
    )
  });

  loginAndSignupRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signupSuccess]),
      tap(action => {
        this.store.dispatch(setErrorMessage({message: ''}));
        if (action.redirect) {
          void this.router.navigate(['/']);
        }
      })
    )
  }, {dispatch: false});

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap(action => {
        return this.auth.signUp(action.email, action.password).pipe(
          map(data => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const user = this.auth.formatUser(data);
            this.auth.setUserInLocalStorage(user);
            return signupSuccess({user, redirect: true});
          }),
          catchError(error => {
            this.store.dispatch(setLoadingSpinner({status: false}));
            const errorMessage = this.auth.getErrorMessage(error.error.error.message);
            return of(setErrorMessage({message: errorMessage}));
          })
        )
      })
    )
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.auth.getUserFromLocalStorage();
        return of(loginSuccess({user, redirect: false}));
      })
    )
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogout),
      map(() => {
        this.auth.logout();
        void this.router.navigate(['auth']);
      })
    )
  }, {dispatch: false});
}
