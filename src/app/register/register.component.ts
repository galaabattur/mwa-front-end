import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  formError: Boolean;
  formErrorMessage: String;

  constructor(private service: LoginService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(),
      birthday: new FormControl(),
      country: new FormControl(),
      isAdmin: new FormControl(),
    });
  }

  ngOnInit(): void {}

  register(formData) {
    console.log('the data to register is ' + JSON.stringify(formData));
    this.service.register(formData).subscribe(
      (data) => {
        const tokenData = jwt_decode(data['token']);
        localStorage.setItem('token', data['token']);
        localStorage.setItem('isAdmin', tokenData.isAdmin);

        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }
}
