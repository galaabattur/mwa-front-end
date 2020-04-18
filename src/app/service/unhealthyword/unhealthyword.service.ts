import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnhelthyWordService {
  private unhealthyWordUrl =
    'https://mwa-project-2020-b.herokuapp.com/api/unhealthy';
  private deteteUnhealthyWordUrl =
    'https://mwa-project-2020-b.herokuapp.com/api/unhealthy/delete';

  constructor(private http: HttpClient) {}

  register(data) {
    return this.http
      .post(this.unhealthyWordUrl, data)
      .pipe(catchError(this.handleError));
  }

  getUnhealthyWord() {
    return this.http
      .get(this.unhealthyWordUrl)
      .pipe(catchError(this.handleError));
  }

  deleteUnhealthyWord(data) {
    return this.http
      .post(this.deteteUnhealthyWordUrl, data)
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
