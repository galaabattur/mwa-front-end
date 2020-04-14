import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

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
  private header: HttpHeaders;

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

  activateUserRow(item) {
    //this.header = new HttpHeaders({ token: item});
    this.service.activeUserPost(item["_id"]).subscribe(
      (data) => {
        this.getInactiveUsers();
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }
}