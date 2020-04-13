import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'],
})
export class ManageUserComponent implements OnInit {
  form: FormGroup;
  formError: Boolean;
  formErrorMessage: String;
  inactiveUsersList = [];

  constructor(private service: UserService, private router: Router) {
    this.form = new FormGroup({
      imgUrl: new FormControl(''),
      description: new FormControl(''),
      minAge: new FormControl(''),
      country: new FormControl(''),
    });
  }
//
  ngOnInit(): void {
    this.getInactiveUsers();
    // this.inactiveUsersList.push({"_id":"5e9389d64c12d4210c5c5ac9","username":"test","email":"jim_javi90@hotmail.com","country":"Uganda","timesBadPost":20});
  }

  getInactiveUsers() {
    this.service.getInactiveUser().subscribe(
      (data) => {
        this.inactiveUsersList = data["usersInactive"];
        console.log("incative user aer "+ JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}