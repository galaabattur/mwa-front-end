import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user/user.service';
import * as jwt_decode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';

let imageUploadUrl = 'https://mwa-project-2020-b.herokuapp.com/';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  public uploader: FileUploader;

  @Input() user;
  userDetails;
  username;
  header;
  token;
  photoBaseUrl = 'https://mwa-project-2020-b.herokuapp.com/';
  myForm = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl(''),
  });

  constructor(private userService: UserService) {
    this.token = localStorage.getItem('token').toString();
    this.username = jwt_decode(localStorage.getItem('token')).username;
    this.header = new HttpHeaders({
      token: this.token.toString(),
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    let photoUploadUrl =
      'https://mwa-project-2020-b.herokuapp.com/api/user/photo/' +
      this.username;

    this.uploader = new FileUploader({
      url: photoUploadUrl,
      itemAlias: 'file',
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log('File upload successfull', item, status, response);
      alert('Successfully uploaded');
      this.getUserDetails();
    };
  }

  getUserDetails() {
    this.userService.getUserData(this.header).subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
