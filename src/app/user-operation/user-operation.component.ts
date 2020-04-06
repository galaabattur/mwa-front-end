import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-operation',
  templateUrl: './user-operation.component.html',
  styleUrls: ['./user-operation.component.css'],
})
export class UserOperationComponent implements OnInit {
  username: String;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('token');
  }

  changeToFollowers() {
    return this.router.navigate(['home/followers']);
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/']);
  }
}
