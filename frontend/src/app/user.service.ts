import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) { 
    this.init();
  }
  
  private init() {
    const accessToken = localStorage.getItem('access-token');

    if(accessToken) {
      this.http.get<User>('/api/me')
      .subscribe(user => {
        this.userSubject.next(user)
      });
    }
  }

  setUser(username: string, accesToken: string, refreshToken: string) {
    this.userSubject.next({
      username
    });

    localStorage.setItem("access-token", accesToken);
    localStorage.setItem("refresh_token", refreshToken);
  }

  getUser() {
    return this.userSubject.asObservable();
  }
}
