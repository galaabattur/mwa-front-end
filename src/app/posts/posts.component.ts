import { Component, OnInit, Input } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { PostService } from '../service/post/post.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  @Input() postsArr;
  header: HttpHeaders;
  token: string;
  commentError = false;
  constructor(private postService: PostService) {
    this.token = localStorage.getItem('token').toString();
    this.header = new HttpHeaders({ token: this.token });
  }

  ngOnInit(): void {
    // console.log(this.postsArr);
  }

  getLikes(postId) {}

  getComments(postId) {}

  submitUnlike(postId) {
    console.log('unlike function');
    const data = { postId: postId };
    this.postService.submitUnlike(data, this.header).subscribe(
      (data) => {
        console.log(data);
        for (let post of this.postsArr) {
          if (post._id == postId) {
            post.likes = data['likes'];
            post.liked = false;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitLike(postId) {
    console.log(postId, 'liked');
    const data = { postId: postId };
    this.postService.submitLike(data, this.header).subscribe(
      (data) => {
        console.log(data);
        for (let post of this.postsArr) {
          if (post._id == postId) {
            post.likes = data['likes'];
            post.liked = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitComment(commentData, postId) {
    if (commentData == '') {
      for (let post of this.postsArr) {
        if (post._id == postId) {
          post.commentError = true;
          break;
        }
      }
      return;
    } else {
      for (let post of this.postsArr) {
        if (post._id == postId) {
          post.commentError = false;
          break;
        }
      }
    }

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

  onScroll() {
    console.log('onscroll functino');
  }

  onUp() {
    console.log('on up function');
  }
}
