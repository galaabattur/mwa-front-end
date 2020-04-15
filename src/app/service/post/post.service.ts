import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  submitCommentUrl = 'http://localhost:3000/api/post/comment';
  submitLikeUrl = 'http://localhost:3000/api/post/like';
  submitUnlikeUrl = 'http://localhost:3000/api/post/unlike';

  constructor(private http: HttpClient) {}

  sendComment(data, header) {
    return this.http
      .post(this.submitCommentUrl, data, { headers: header })
      .pipe(catchError(this.handleError));
  }

  submitLike(data, header) {
    return this.http
      .post(this.submitLikeUrl, data, { headers: header })
      .pipe(catchError(this.handleError));
  }

  submitUnlike(data, header) {
    return this.http
      .post(this.submitUnlikeUrl, data, { headers: header })
      .pipe(catchError(this.handleError));
  }

  private handleError(error) {
    if (error instanceof HttpErrorResponse) {
      // Server side error
      console.log('Server side error', error);
    } else {
      // client side error
      console.log('Client side error', error);
    }
    return throwError(error);
  }
}
