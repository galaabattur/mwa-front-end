import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) {}

  submitPost(data) {
    const header = new HttpHeaders({ token: localStorage.getItem('token') });

    this.http
      .post(this.postUrl, data, { headers: header })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPosts() {
    console.log('getting posts');
  }
}
