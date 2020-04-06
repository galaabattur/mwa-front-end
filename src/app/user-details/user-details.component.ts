import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  username: String;
  email: String;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserData('galaa').subscribe((data) => {
      this.username = data['username'];
      this.email = data['email'];
    });
  }
}
