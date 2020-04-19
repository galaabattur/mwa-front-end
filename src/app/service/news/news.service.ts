import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  // private postUrl = 'https://mwa-project-2020-b.herokuapp.com/api/post';
  // private searchPostUrl = 'https://mwa-project-2020-b.herokuapp.com/api/post/search';

  private postUrl = environment.baseUrl + '/post';
  private searchPostUrl = environment.baseUrl + '/post/search';

  constructor(private http: HttpClient) {}

  submitPost(data, header) {
    console.log('data before submitting:', data);
    return this.http
      .post(this.postUrl, data, { headers: header })
      .pipe(catchError(this.handleError));
  }

  // submitPostWithPhoto(photo, header) {
  //   console.log(photo);
  //   this.http
  //     .post('https://mwa-project-2020-b.herokuapp.com/api/post/testphoto', photo, {
  //       headers: header,
  //     })
  //     .subscribe(
  //       (data) => console.log(data),
  //       (error) => console.log(error)
  //     );
  // }

  getPosts(header) {
    const username = jwt_decode(localStorage.getItem('token')).username;
    return this.http
      .get(this.postUrl + '/' + username, { headers: header })
      .pipe(catchError(this.handleError));
  }

  searchPost(data, header) {
    return this.http
      .post(this.searchPostUrl, data, { headers: header })
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
