import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../service/advertisement/advertisement.service';

@Component({
  selector: 'advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {
  constructor(private advService: AdvertisementService) {}

  advertisementList=[];

  ngOnInit(): void {
    this.getAdvertisement();
  }

  getAdvertisement() {
    this.advService.getAdvertisement().subscribe(
      (data) => {
        this.advertisementList = data["advertisement"];
        console.log("the advertisement are "+ JSON.stringify(this.advertisementList));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
