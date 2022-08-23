import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AuthResponseData} from "../models/authResponseData.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`,
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
      default:
        return 'Unknown error occurred. Please try again later'
    }
  }
}
