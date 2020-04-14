import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { PostService } from '../service/post/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() postsArr;
  header: HttpHeaders;
  token: string;
  constructor(private postService: PostService) {
    this.token = localStorage.getItem('token').toString();
    this.header = new HttpHeaders({ token: this.token });
  }

  ngOnInit(): void {}

  submitComment(commentData, postId) {
    const data = { comment: commentData, postId: postId };

    this.postService.sendComment(data, this.header);
  }
}
