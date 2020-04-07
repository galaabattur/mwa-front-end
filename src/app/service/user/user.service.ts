import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getUserDataUrl = 'http://localhost:3000/api/user';
  private token: String;

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
}
