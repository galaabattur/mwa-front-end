import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  // private advertisementUrl ='https://mwa-project-2020-b.herokuapp.com/api/advertisement';

  private advertisementUrl = environment.baseUrl + '/advertisement';

  constructor(private http: HttpClient) {}

  register(data) {
    return this.http
      .post(this.advertisementUrl, data)
      .pipe(catchError(this.handleError));
  }

  getAdvertisement(country, years) {
    const data = { country: country, years: years };
    return this.http
      .get(this.advertisementUrl + '/' + country + '/' + years, {
        params: data,
      })
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
