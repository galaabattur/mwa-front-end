import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
import UserResponse from '../models/UserResponse';

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
    });
  }

  ngOnInit(): void {}

  register(formData) {
    this.service.register(formData).subscribe(
      (data) => {
        let userRes: UserResponse = JSON.parse(JSON.stringify(data));
        localStorage.setItem('token', userRes.token);
        localStorage.setItem('admin', userRes.isAdmin);

      if(userRes.isAdmin) {

      } else {
          this.router.navigate(['/home']);
        }
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
