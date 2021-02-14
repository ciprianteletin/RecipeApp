import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user.model';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHF0HOr3PkPCiR3xWB49ykrNbNbrdBr8U', {
      email,
      password,
      returnSecureToken: true
    })
      .pipe(tap(resData => this.handleAuth(resData.email, resData.idToken, resData.localId, +resData.expiresIn)));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHF0HOr3PkPCiR3xWB49ykrNbNbrdBr8U',
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(tap(resData => this.handleAuth(resData.email, resData.idToken, resData.localId, +resData.expiresIn)));
  }

  logout(): void {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogin(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData.tokenExpirationDate));

    if (!loadedUser.token) {
      return;
    }
    this.user.next(loadedUser);
    const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(this.logout, expirationDuration);
  }

  private handleAuth(email: string, token: string, id: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
