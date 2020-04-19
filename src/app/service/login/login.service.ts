import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private loginUrl = 'https://mwa-project-2020-b.herokuapp.com/api/user/login';
  // private registerUrl = 'https://mwa-project-2020-b.herokuapp.com/api/user';
  // private disabledUserUrl = 'https://mwa-project-2020-b.herokuapp.com/api/user/disabledUserPost';

  private loginUrl = environment.baseUrl + '/user/login';
  private registerUrl = environment.baseUrl + '/user';
  private disabledUserUrl = environment.baseUrl + '/user/disabledUserPost';

  constructor(private http: HttpClient) {}

  login(data) {
    return this.http
      .post(this.loginUrl, data)
      .pipe(catchError(this.handleError));
  }

  register(data) {
    return this.http
      .post(this.registerUrl, data)
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

  disabledUser(header) {
    return this.http
      .post(this.disabledUserUrl, 'user', { headers: header })
      .pipe(catchError(this.handleError));
  }
}
