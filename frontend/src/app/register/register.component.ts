import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'chad-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = undefined;
  formGroup: FormGroup;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      registrationCode: new FormControl(null, [Validators.required, Validators.maxLength(50)])
    });
  }

  onSubmit() {
    
  }

}
