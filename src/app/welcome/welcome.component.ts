import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  url: string = environment.baseUrl;

  constructor() {
    console.log(this.url);
  }

  ngOnInit(): void {}
}
