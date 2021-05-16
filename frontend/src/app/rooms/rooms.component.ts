import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'chad-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  user$: Observable<User>
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser()
    .pipe(tap(e => console.log(e)));
  }

}
