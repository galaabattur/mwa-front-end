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
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserData().subscribe(
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
