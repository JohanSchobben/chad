import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/users/users.service';
import { MatDialog } from "@angular/material/dialog"
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'chad-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private readonly usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers()
  }

  editUser(user: User) {
    this.dialog.open(UserEditComponent, {data: user});
  }

}
