import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean;
  loginFailed: boolean;
  notLoggedIn = true;

  constructor(private router: Router, private service: LoginService) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/home']);
    }
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
    this.service.login(formData).subscribe(
      (data) => {
        // success case
        localStorage.setItem('token', data['token']);
        localStorage.setItem('isAdmin', data['isAdmin']);
        this.router.navigate(['/home']);
      },
      (error) => {
        // Error section
        this.loginFailed = true;
      }
    );
  }
}
