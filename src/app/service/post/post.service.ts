import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  submitCommentUrl = 'http://localhost:3000/api/post/comment';

  constructor(private http: HttpClient) {}

  sendComment(data, header) {
    console.log(data);
    this.http.post(this.submitCommentUrl, data, { headers: header }).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
