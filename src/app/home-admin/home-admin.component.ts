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
    console.log("-----------is admin "+admin);
    if (token) {
      if(admin === 'true'){
        console.log("true admin");
        this.router.navigate(['/home/home-admin']);
      } else {
        console.log("false admin");
        this.router.navigate(['/home/news']);
      }
      this.currPage = 'home';
    } else {
      this.router.navigate(['/']);
    }
  }
}