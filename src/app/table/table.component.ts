import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  ItemsArray = [{id: 1, name: "Jimmy", email:"n", phone: "01", address:"addres"}];
  /*
  id }}</th>
             <td>{{ item.name }}</td>
             <td>{{ item.email }}</td>
             <td>{{ item.phone}}</td>
             <td>{{ item.address
  */
  constructor() { }

  ngOnInit(): void {
  }

}
