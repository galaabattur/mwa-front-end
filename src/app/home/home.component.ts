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
    if (token) {
      if (admin === 'true') {
        this.router.navigate(['/home/home-admin']);
      } if(activateRequest === 'false'){
        this.router.navigate(['/home/request-activate']);
      } 
        else {
        this.router.navigate(['/home/news']);
      }
      this.currPage = 'home';
    } else {
      this.router.navigate(['/']);
    }
  }
}
