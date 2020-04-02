import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  form: FormGroup;
  invalidLogin: boolean;

  loginFailed: boolean;

  constructor(private router: Router, private service: LoginService) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  log(x) {
    console.log(x);
  }

  login(formData) {
    this.service.login(formData).subscribe(data => {
      console.log(data);
      if (data.valid) {
        localStorage.setItem('token', data.tokenData);
        this.router.navigate(['home']);
      } else {
        this.loginFailed = true;
      }
    });
  }
}
