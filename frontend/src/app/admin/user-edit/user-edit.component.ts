import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'chad-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  formGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private usersService: UsersService, private dialogRef: MatDialogRef<UserEditComponent>) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required, Validators.maxLength(25)])
    });
  }

  onSubmit() {
    this.usersService.editUserName(this.user.id, this.formGroup.value.username)
      .subscribe(res => {
        this.dialogRef.close();
      })
  }
}
