import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AuthResponseData} from "../models/authResponseData.model";
import {User} from "../models/user.model";
import {Store} from "@ngrx/store";
import {autoLogout} from "../auth/state/auth.actions";
import {AppState} from "../store/app.state";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  timeoutInterval: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
      {
        email, password, returnSecureToken: true
      }
    )
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
      {
        email, password, returnSecureToken: true
      }
    )
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    return new User(data.email, data.idToken, data.localId, expirationDate);
  }

  getErrorMessage(message: string): string {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found!'
      case 'INVALID_PASSWORD':
        return 'Password not found!'
      case 'USER_DISABLED':
        return 'User not found!'
      case 'EMAIL_EXISTS':
        return 'Email already exists!'
      default:
        return 'Unknown error occurred. Please try again later'
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todayDate = new Date().getDate();
    const expirationDate = user.getExpirationDate.getTime();
    const timeInterval = todayDate - expirationDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout func or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate)
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');

    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
