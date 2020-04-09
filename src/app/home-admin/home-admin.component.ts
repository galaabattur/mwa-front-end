import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertisementService } from '../service/advertisement/advertisement.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  form: FormGroup;
  formError: Boolean;
  formErrorMessage: String;

  constructor(private service: AdvertisementService, private router: Router) {
    this.form = new FormGroup({
      imgUrl: new FormControl(''),
      description: new FormControl(''),
      minAge: new FormControl(''),
      country: new FormControl(''),
    });
  }
//
  ngOnInit(): void {}

  newAdvertisement(formData) {
    console.log("the data is "+JSON.stringify(formData));
    this.service.register(formData).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }
}