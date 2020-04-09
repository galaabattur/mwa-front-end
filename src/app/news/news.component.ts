import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NewsService } from '../service/news/news.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  form: FormGroup;
  posts;
  private header: HttpHeaders;

  constructor(private newsService: NewsService) {
    this.header = new HttpHeaders({ token: localStorage.getItem('token') });
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
    this.newsService.getPosts(this.header).subscribe(
      (data) => {
        console.log(data);
        this.posts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newPost(data) {
    this.newsService.submitPost(data, this.header);
  }
}
