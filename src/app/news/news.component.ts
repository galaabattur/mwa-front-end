import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../service/post/post.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  form: FormGroup;

  constructor(private postService: PostService) {
    this.form = new FormGroup({
      postname: new FormControl(''),
    });
  }

  get postname() {
    return this.form.get('postname');
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts();
  }

  newPost(data) {
    this.postService.submitPost(data);
  }
}
