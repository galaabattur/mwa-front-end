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
  private getFollowerUrl = 'http://localhost:3000/api/user/follower';
  private postUnfollowUrl = 'http://localhost:3000/api/user/unfollow';
  private updateBadpostUrl = 'http://localhost:3000/api/user/updateBadPost';
  private inactiveUserUrl = 'http://localhost:3000/api/user/getInactive';
  private activeUserpostUrl = 'http://localhost:3000/api/user/activeUser';
  private sendRequestActivatePostUrl = 'http://localhost:3000/api/user/requestActiveUser';
  
  private token: String;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token').toString();
  }

  getUserData(header) {
    return this.http.get(this.getUserDataUrl, {
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
    console.log(data);
    return this.http
      .post(this.addFollowerUrl, { follower: data }, { headers: header })
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

  getFollowingList(header) {
    return this.http
      .get(this.getFollowerUrl, { headers: header })
      .pipe(catchError(this.handleError));
  }

  unfollow(unfollowed, header) {
    const data = { unfollow: unfollowed };
    return this.http
      .post(this.postUnfollowUrl, data, { headers: header })
      .pipe(catchError(this.handleError));

    // .subscribe(
    //   (data) => console.log(data),
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  increaseBadPost(header) {
    return this.http
      .post(this.updateBadpostUrl, "user", { headers: header })
      .pipe(catchError(this.handleError));
  }

  getInactiveUser() {
    return this.http
      .get(this.inactiveUserUrl)
      .pipe(catchError(this.handleError));
  }

  activeUserPost(item) {
    return this.http
      .post(this.activeUserpostUrl, {"user": item})
      .pipe(catchError(this.handleError));
  }

  sendRequestActivatePost(header) {
    return this.http
      .post(this.sendRequestActivatePostUrl, "user", {headers: header})
      .pipe(catchError(this.handleError));
  }
}
