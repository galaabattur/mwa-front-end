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

  ngOnInit(): void {
    console.log(this.postsArr);
  }

  getLikes(postId) {}

  getComments(postId) {}

  submitComment(commentData, postId) {
    const data = { comment: commentData, postId: postId };
    this.postService.sendComment(data, this.header).subscribe(
      (data) => {
        console.log(this.postsArr);
        console.log(data);

        this.postsArr.map((post) => {
          console.log(post._id);
          console.log(data['newpost']['_id']);
          if (post._id == data['newpost']['_id']) {
            post.comments = data['newpost']['comments'];
          } else {
            return post;
          }
        });

        console.log(this.postsArr);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
