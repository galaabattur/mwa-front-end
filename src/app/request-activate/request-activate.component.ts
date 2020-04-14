import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UnhelthyWordService } from '../service/unhealthyword/unhealthyword.service';

@Component({
  selector: 'request-activate',
  templateUrl: './request-activate.component.html',
  styleUrls: ['./request-activate.component.css']
})
export class RequestActivateComponent implements OnInit {
  form: FormGroup;
  formError: Boolean;
  formErrorMessage: String;

  ItemsArray = [];
  constructor(private service: UnhelthyWordService) {
    this.form = new FormGroup({
      unhealthyWord: new FormControl(''),
    });
  }

  newHealthyWord(formData) {
    this.service.register(formData).subscribe(
      (data) => {
        this.ItemsArray.push({_id: data["unhealthyWordClass1"]["_id"], unhealthyWord: data["unhealthyWordClass1"]["unhealthyWord"]});
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }

  ngOnInit(): void {
    this.getUnhealthyWord();
  }

  getUnhealthyWord() {
    this.service.getUnhealthyWord().subscribe(
      (data) => {
        this.ItemsArray = data["unhealthyWordsList"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRow(item) {
    this.service.deleteUnhealthyWord(item).subscribe(
      (data) => {
        this.getUnhealthyWord();
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }
}
