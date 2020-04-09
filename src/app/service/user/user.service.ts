import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getUserDataUrl = 'http://localhost:3000/api/user';
  private searchUserUrl = 'http://localhost:3000/api/user/search';
  private addFollowerUrl = 'http://localhost:3000/api/user/follower';

  private token: String;
  private username: String;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token').toString();
  }

  getUserData(username) {
    const header = new HttpHeaders({
      token: this.token.toString(),
    });
    return this.http.get(this.getUserDataUrl + '/' + username, {
      headers: header,
    });
  }

  searchUser(data, header) {
    return this.http
      .post(
        this.searchUserUrl,
        { username: data['searchname'] },
        { headers: header }
      )
      .pipe(catchError(this.handleError));
  }

  addFollower(data, header) {
    return this.http
      .post(
        this.addFollowerUrl + '/' + data['username'],
        { follower: data['follower'] },
        {
          headers: header,
        }
      )
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
