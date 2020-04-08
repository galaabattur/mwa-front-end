import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user/user.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user;
  username: String;
  email: String;

  constructor(private userService: UserService) {
    this.username = jwt_decode(localStorage.getItem('token')).username;
  }

  ngOnInit(): void {
    this.userService.getUserData(this.username).subscribe((data) => {
      this.username = data['username'];
      this.email = data['email'];
    });
  }
}
