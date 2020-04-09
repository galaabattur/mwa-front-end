import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../service/user/user.service';
import * as jwt_decode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user;
  userDetails;
  username;
  header;
  token;
  fileToUpload: File;
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
  }

  getUserDetails() {
    this.userService.getUserData(this.username, this.header).subscribe(
      (data) => {
        this.userDetails = data;
        console.log('userdetails', this.userDetails);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    console.log('onfilechange function');
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      console.log(this.fileToUpload);
      console.log('if true');
      // this.myForm.patchValue({
      //   fileSource: file,
      // });
      // this.myForm.get('fileSource').setValue(file);
      console.log(this.myForm);
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    console.log(formData);
    this.userService.uploadPhoto(formData, this.username, this.header);

    // this.http
    //   .post('http://localhost:8001/upload.php', formData)
    //   .subscribe((res) => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   });
  }
}
