import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppError } from 'src/app/common/App-Error';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/api/user/login';

  constructor(private http: HttpClient) {}

  login(data) {
    // return this.http.post(this.loginUrl, data).subscribe(
    //   (response: Response) => {
    //     console.log('response', response);
    //   },
    //   (error: HttpErrorResponse) => {
    //     return Observable.throw(new AppError(error));
    //   }
    // );

    return this.http.post(this.loginUrl, data).pipe(
      tap((response: Response) => {
        console.log(response);
      }, catchError(this.errorHandler))
    );
  }

  errorHandler(err: HttpErrorResponse): Observable<AppError> {
    if (err.status == 400) {
      alert('bad request');
    }
    return Observable.throw(new AppError(err.message));
  }
}
