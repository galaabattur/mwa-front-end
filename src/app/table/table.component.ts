import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UnhelthyWordService } from '../service/unhealthyword/unhealthyword.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  form: FormGroup;
  formError: Boolean;
  formErrorMessage: String;

  ItemsArray = [{id: 1, name: "Jimmy", email:"n", phone: "01", address:"addres"}];
  constructor(private service: UnhelthyWordService) {
    this.form = new FormGroup({
      unhealthyWord: new FormControl(''),
    });
  }

  newHealthyWord(formData) {
    this.service.register(formData).subscribe(
      (data) => {
        
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
