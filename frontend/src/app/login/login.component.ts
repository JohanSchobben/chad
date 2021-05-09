import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { LoginService } from './login.service';

@Component({
  selector: 'chad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string = undefined;
  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });
  }
  
  onSubmit() {
    console.log(this.formGroup.valid)
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value)
        .subscribe(response => {
          this.userService.setUser(response.username, response.accesToken, response.refreshToken);
          this.router.navigateByUrl("/");
        }, error => {
          this.errorMessage = error.message;
        })
    }
  }
}
