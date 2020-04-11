import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.css'],
})
export class UserblockComponent implements OnInit {
  @Input() users;
  header: HttpHeaders;

  constructor(private userService: UserService) {
    this.header = new HttpHeaders({ token: localStorage.getItem('token') });
  }

  ngOnInit(): void {}

  follow(follower) {
    console.log('follow function');
    this.userService.addFollower(follower, this.header).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  unfollow(follower) {
    console.log('unfollow function');
    console.log(follower);

    this.userService.unfollow(follower, this.header);
  }
}
