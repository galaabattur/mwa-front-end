import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currPage: String;

  constructor(
    private service: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    let admin = localStorage.getItem('isAdmin');
    let activateRequest = localStorage.getItem("activateRequest");
    console.log("admin "+admin);
    console.log("activateRequest "+activateRequest);
    if (token) {
      if (admin === 'true') {
        console.log("admin === 'true'");
        this.router.navigate(['/home/home-admin']);
      } if(activateRequest === 'false'){
        console.log("activateRequest === 'false'");
        this.router.navigate(['/home/request-activate']);
      } 
        else {
          console.log("else");
        this.router.navigate(['/home/news']);
      }
      this.currPage = 'home';
    } else {
      this.router.navigate(['/']);
    }
  }
}
