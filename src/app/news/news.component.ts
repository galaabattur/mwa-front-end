import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NewsService } from '../service/news/news.service';
import { UnhelthyWordService } from '../service/unhealthyword/unhealthyword.service';
import { UserService } from '../service/user/user.service';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
// import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  // public uploader: FileUploader;
  photoName = '';
  photoUploadFlg: Boolean;
  form: FormGroup;
  searchform: FormGroup;
  posts;
  allPosts;
  private header: HttpHeaders;
  ItemsArray = [];
  file;

  constructor(
    private newsService: NewsService,
    private service: UnhelthyWordService,
    private userservice: UserService
  ) {
    this.header = new HttpHeaders({ token: localStorage.getItem('token') });
    this.form = new FormGroup({
      postname: new FormControl(''),
    });

    this.searchform = new FormGroup({
      searchpost: new FormControl(''),
    });
  }

  searchPost(formData) {
    this.newsService.searchPost(formData, this.header).subscribe(
      (data) => {
        let t = [];
        for (let i = 0; i < 11; i++) {
          if (data[i] == undefined) {
            continue;
          }
          t.push(data[i]);
        }
        this.posts = t;
        this.allPosts = data;
        for (let i = 0; i < t.length; i++) {
          this.allPosts.shift();
        }
      },
      (error) => console.log(error)
    );
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
        let t = [];
        for (let i = 0; i < 11; i++) {
          if (data[i] == undefined) {
            continue;
          }
          t.push(data[i]);
        }
        this.posts = t;
        this.allPosts = data;
        for (let i = 0; i < t.length; i++) {
          this.allPosts.shift();
        }

        console.log('posts', this.posts);
        console.log('All posts', this.allPosts);
      },
      (error) => {
        alert(error);
      }
    );
  }

  getOnePost() {
    this.newsService.getPosts(this.header).subscribe(
      (data) => {
        console.log(data);
        this.posts = [].concat(this.posts, data);
      },
      (error) => console.log(error)
    );
  }

  newPost(data) {
    console.log(data);
    this.isUnhealthyWord(data);
    console.log(this.file);
    const uploadData = new FormData();
    if (this.file != undefined) {
      uploadData.append('myFile', this.file, this.file.name);
    }
    uploadData.append('postname', data['postname']);
    // this.newsService.submitPostWithPhoto(uploadData, this.header);
    this.newsService.submitPost(uploadData, this.header).subscribe(
      (data) => {
        console.log(data);
        this.allPosts = [];
        this.posts = [];
        this.getPosts();
        // this.posts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileChange(event) {
    this.file = event.target.files[0];
    if (this.file != undefined) {
      this.photoName = this.file.name;
      this.photoUploadFlg = true;
    }
  }

  getUnhealthyWord() {
    this.service.getUnhealthyWord().subscribe(
      (data) => {
        this.ItemsArray = data['unhealthyWordsList'];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isUnhealthyWord(data) {
    for (let i = 0; i < this.ItemsArray.length; i++) {
      if (this.ItemsArray[i]['unhealthyWord'] == data['postname']) {
        let token = jwt_decode(localStorage.getItem('token'));
        this.userservice.increaseBadPost(this.header).subscribe(
          (data) => {},
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  onScroll() {
    if (this.allPosts.length > 0) {
      this.posts.push(this.allPosts.shift());
    }
  }
}
