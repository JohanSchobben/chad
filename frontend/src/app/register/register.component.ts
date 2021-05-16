import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'chad-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = undefined;
  formGroup: FormGroup;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      secretQuestion: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      secretAnswer: new FormControl(null, Validators.required),
      registerToken: new FormControl(null, [Validators.required, Validators.maxLength(50)])
    });
  }

  onSubmit() {
    console.log(this.formGroup)
    if (this.formGroup.valid) {
      this.loginService.register(this.formGroup.value)
        .subscribe(() => {
          this.router.navigate(['login'], {queryParams: {registerSuccess: true}});
        }, err => {
          this.errorMessage = err.error.message;
        })
    }
  }

}
