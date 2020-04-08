import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() postsArr;

  constructor() {}

  ngOnInit(): void {}
}
