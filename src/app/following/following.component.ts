import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit {
  searchForm: FormGroup;
  private header: HttpHeaders;
  searchResult: any[];
  noresult: boolean = false;
  username: string;
  followed = false;
  followText = 'Follow';

  constructor(private userService: UserService) {
    // this.header = new HttpHeaders({ token: localStorage.getItem('token') });
    // this.username = jwt_decode(localStorage.getItem('token')).username;
    this.searchForm = new FormGroup({
      searchname: new FormControl(),
    });
  }

  get searchname() {
    return this.searchForm.get('searchname');
  }

  searchUserName(formData) {
    this.userService.searchUser(formData).subscribe(
      (data) => {
        console.log(data);
        if (data['users'].length == 0) {
          this.noresult = !this.noresult;
        } else {
          this.searchResult = data['users'];
          this.noresult = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  follow(data) {
    const sendData = { follower: data.innerHTML, username: this.username };
    this.userService.addFollower(sendData).subscribe(
      (data) => {
        console.log(data);
        if (data['msg'] === 'success') {
          this.followed = true;
          this.followText = 'Unfollow';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
