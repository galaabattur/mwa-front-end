import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private getUserDataUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  getUserData(username) {
    return this.http.get(this.getUserDataUrl + '/' + username);
  }
}
