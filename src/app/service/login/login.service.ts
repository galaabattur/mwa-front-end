import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  login(data): Observable<any> {
    return this.http.post(this.loginUrl, data);
  }
}
