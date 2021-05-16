import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Tokens } from './models/Tokens';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { 
    this.init();
  }
  
  private init() {
    const accessToken = localStorage.getItem('access-token');

    if(accessToken) {
      this.http.post<{user: User}>('/api/me', {
        token: accessToken
      })
      .subscribe(response => {
        this.userSubject.next(response.user)
      });
    }
  }

  setUser(user: User, accesToken: string, refreshToken: string) {
    this.userSubject.next(user);

    localStorage.setItem("access-token", accesToken);
    localStorage.setItem("refresh_token", refreshToken);
  }

  getUser() {
    return this.userSubject.asObservable();
  }
  

  public refresh(): Observable<Tokens> {
    return this.http.post<Tokens>('/api/refresh', {
      token: localStorage.getItem('refresh-token')
    }).pipe(
      tap((tokens: Tokens) => {
        localStorage.setItem('access-token', tokens.access);
        localStorage.setItem('refresh-token', tokens.refresh);
      })
    )
  }

}
