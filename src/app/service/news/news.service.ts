import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private postUrl = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) {}

  submitPost(data, header) {
    this.http
      .post(this.postUrl, data, { headers: header })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getPosts(header) {
    const username = jwt_decode(localStorage.getItem('token')).username;
    console.log(username);
    console.log(this.postUrl + '/' + username);
    return this.http
      .get(this.postUrl + '/' + username, { headers: header })
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
