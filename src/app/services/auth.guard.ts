import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {AuthState} from "../auth/state/auth.state";
import {isAuthenticated} from "../auth/state/auth.selector";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isAuthenticated).pipe(
      map(auth => {
        if (!auth) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      })
    )
  }

}
