import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest } from '../models/requests/login-request';
import { LoginResponse } from '../models/responses/login-response';
import { Tokens } from '../models/Tokens';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("/api/login", loginData);
  }

  public register(registerData): Observable<User> {
    return this.http.post<User>("/api/register", registerData);
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
