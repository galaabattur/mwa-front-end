import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.css'],
})
export class UserblockComponent implements OnInit {
  @Input() users;
  imgBaseUrl = 'https://localhost:3000/';
  constructor() {}

  ngOnInit(): void {}

  follow() {
    console.log('follow function');
  }

  unfollow() {
    console.log('unfollow function');
  }
}
