import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [
    {
      title: 'news 1 ',
      body: 'body 1',
      comments: 'test comment',
      likes: '23'
    },
    {
      title: 'news 2 ',
      body: 'body 2',
      comments: 'test comment',
      likes: '23'
    },
    {
      title: 'news 3',
      body: 'body 3',
      comments: 'test comment',
      likes: '23'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
