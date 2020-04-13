import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'user-operation',
  templateUrl: './user-operation.component.html',
  styleUrls: ['./user-operation.component.css'],
})
export class UserOperationComponent implements OnInit {
  username: String;
  isAdmin = localStorage.getItem('isAdmin') == 'true' ? true : false;
  showUsername: String;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('token');
    this.showUsername = jwt_decode(localStorage.getItem('token'))['username'];
  }

  changeToFollowing() {
    return this.router.navigate(['home/following']);
  }

  changeToNews() {
    return this.router.navigate(['home/news']);
  }

  changeToUserDetails() {
    return this.router.navigate(['home/userdetails']);
  }

  changeToNewAdvertisement() {
    return this.router.navigate(['home/home-admin']);
  }

  changeToNewUnhealthyWords() {
    return this.router.navigate(['home/app-table']);
  }

  changeToManageUser() {
    return this.router.navigate(['home/manage-user']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
}
