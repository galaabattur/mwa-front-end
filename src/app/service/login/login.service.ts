import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from 'src/app/common/App-Error';
import { catchError, tap } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient) {}

  login(data) {
    return this.http
      .post(this.loginUrl, data)
      .pipe(catchError(this.handleError));
  }

  private handleError(error) {
    if (error instanceof HttpErrorResponse) {
      // Server side error
      console.log('err', error);
    } else {
      // client side error
    }
    return throwError(error);
  }
}
