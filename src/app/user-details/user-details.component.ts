import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user/user.service';
import * as jwt_decode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user;
  userDetails;
  username;
  header;
  token;
  constructor(private userService: UserService) {
    this.token = localStorage.getItem('token').toString();
    this.username = jwt_decode(localStorage.getItem('token')).username;
    this.header = new HttpHeaders({
      token: this.token.toString(),
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserData(this.username, this.header).subscribe(
      (data) => {
        this.userDetails = data;
        console.log('userdetails', this.userDetails);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
