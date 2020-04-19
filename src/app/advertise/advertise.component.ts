import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../service/advertisement/advertisement.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css'],
})
export class AdvertiseComponent implements OnInit {
  constructor(private advService: AdvertisementService) {}

  advertisementList = [];

  ngOnInit(): void {
    this.getAdvertisement();
  }

  getAdvertisement() {
    let birthday = jwt_decode(localStorage.getItem('token')).birthday;
    let country = jwt_decode(localStorage.getItem('token')).country;
    let bithDayDate = new Date(birthday);

    var ageDifYear = new Date().getFullYear() - bithDayDate.getFullYear();
    console.log(country);
    console.log(ageDifYear);

    this.advService.getAdvertisement(country, ageDifYear).subscribe(
      (data) => {
        this.advertisementList = data['advertisement'];
        console.log(
          'the advertisement are ' + JSON.stringify(this.advertisementList)
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
