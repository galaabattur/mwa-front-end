import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NewsService } from '../service/news/news.service';
import { UnhelthyWordService } from '../service/unhealthyword/unhealthyword.service';
import { UserService } from '../service/user/user.service';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  form: FormGroup;
  posts;
  private header: HttpHeaders;
  ItemsArray=[];

  constructor(private newsService: NewsService, private service: UnhelthyWordService, private userservice: UserService) {
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
    this.getUnhealthyWord();
  }

  getPosts() {
    this.newsService.getPosts(this.header).subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        alert(error);
      }
    );
  }

  newPost(data) {
    this.isUnhealthyWord(data);
    this.newsService.submitPost(data, this.header);
  }

  getUnhealthyWord() {
    this.service.getUnhealthyWord().subscribe(
      (data) => {
        this.ItemsArray = data["unhealthyWordsList"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isUnhealthyWord(data) {
    for(let i=0; i<this.ItemsArray.length; i++) {
      if(this.ItemsArray[i]["unhealthyWord"]==data["postname"]){
        let token = jwt_decode(localStorage.getItem('token'));
        this.userservice.increaseBadPost(this.header).subscribe(
          (data) => {
            
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
