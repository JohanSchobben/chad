import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject: BehaviorSubject<User[]> = new  BehaviorSubject<User[]>([]);
  private fetched = false;
  constructor(private http: HttpClient) { }

  getUsers() {
    if (!this.fetched) {
      this.http.get<User[]>('/api/users')
        .subscribe((users) => {
          this.usersSubject.next(users)
        })
    }
    return this.usersSubject.asObservable();
  }

  editUserName(userId: number, newName: string) {
      return this.http.patch('/api/users/' + userId + '/username', {username: newName})
        .pipe(
          tap(() => {
            const updatedUsers = this.usersSubject.getValue().map(user => {
              if (user.id === userId) {
                user.username = newName;
              }
              return user;
            });
            this.usersSubject.next(updatedUsers)
          })
        )
  }

  removeUser(user: User) {
    return this.http.delete('/api/users/' + user.id)
      .pipe(
        tap(res => {
          const newUsers = this.usersSubject.getValue().filter(usr => usr.id !== user.id);
          this.usersSubject.next(newUsers);
        })
      );
  }
}
