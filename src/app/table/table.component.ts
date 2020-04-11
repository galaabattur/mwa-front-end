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
    console.log("the row is "+item._id)
    this.service.deleteUnhealthyWord(item).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error.error);
        this.formErrorMessage = error.error;
        this.formError = true;
      }
    );
  }
}
