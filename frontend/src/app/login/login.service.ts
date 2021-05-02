import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/requests/login-request';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(loginData: LoginRequest): Observable<User> {
    return this.http.post<User>("/api/login", loginData);
  }

  public register(registerData): Observable<User> {
    return this.http.post<User>("/api/register", registerData);
  }

}
