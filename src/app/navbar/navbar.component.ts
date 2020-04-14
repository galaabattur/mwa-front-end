import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

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
  isEnabled: boolean;
  punishedUser: boolean;
  private header: HttpHeaders;

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
        const tokenData = jwt_decode(data['token']);
        console.log("tokenData[isEnabled] "+tokenData["isEnabled"]);
        if(tokenData["isEnabled"]){
          if(tokenData["timesBadPost"] > 19){//validate if user has more than 20 unhealthy post
              this.header = new HttpHeaders({token: data['token']});
              this.service.disabledUser(this.header).subscribe(
                (data) => {
                 this.punishedUser = true;
                },
                  (error) => {
                  console.log(error);
                });
              } else {
              // success case
              localStorage.setItem('token', data['token']);
              localStorage.setItem('isAdmin', tokenData.isAdmin);
              localStorage.setItem('isEnabled', tokenData["isEnabled"]);
              this.router.navigate(['/home']);
            }
        } if(!tokenData["activateRequest"]){
          localStorage.setItem('token', data['token']);
          localStorage.setItem('activateRequest', tokenData["activateRequest"]);
          localStorage.setItem('isEnabled', tokenData["isEnabled"]);
          this.router.navigate(['/home']);
        }
          else {
          this.isEnabled = true;
        }
      },
      (error) => {
        // Error section
        this.loginFailed = true;
      }
    );
  }
}
