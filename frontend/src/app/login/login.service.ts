import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/requests/login-request';
import { LoginResponse } from '../models/responses/login-response';
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
}
