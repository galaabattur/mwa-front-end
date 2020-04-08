import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit {
  searchForm: FormGroup;
  private header: HttpHeaders;
  searchResult: any[];

  constructor(private userService: UserService) {
    this.header = new HttpHeaders({ token: localStorage.getItem('token') });
    this.searchForm = new FormGroup({
      searchname: new FormControl(),
    });
  }

  get searchname() {
    return this.searchForm.get('searchname');
  }

  searchUserName(formData) {
    this.userService.searchUser(formData, this.header).subscribe(
      (data) => {
        console.log(data);
        this.searchResult = data['users'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
