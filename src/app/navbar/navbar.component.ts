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

  constructor(private router: Router, private service: LoginService) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {}

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
        console.log(data);
        localStorage.setItem('token', data['token']);
        this.router.navigate(['/home']);
      },
      (error) => {
        // Error section
        this.loginFailed = true;
      }
    );
  }
}
