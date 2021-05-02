import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'chad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string = undefined;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    });
  }
  
  onSubmit() {
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value)
        .subscribe(_ => {
          this.router.navigateByUrl("/")
        }, error => {
          this.errorMessage = error.message
        })
    }
  }

}
