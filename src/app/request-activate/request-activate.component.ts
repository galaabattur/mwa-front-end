import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'request-activate',
  templateUrl: './request-activate.component.html',
  styleUrls: ['./request-activate.component.css']
})
export class RequestActivateComponent implements OnInit {
  form: FormGroup;
  formError: Boolean;
  formErrorMessage: String;
  header: HttpHeaders;

  ItemsArray = [];
  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      activateAcc: new FormControl(''),
    });
  }

  requestActivate(formData) {
    this.header = new HttpHeaders({ token: localStorage.getItem('token') });
    this.service.sendRequestActivatePost(this.header).subscribe(
      (data) => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('activateRequest');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }

  ngOnInit(): void {}
}
