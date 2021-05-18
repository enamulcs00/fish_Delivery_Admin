import { Component, OnInit } from '@angular/core';

interface Geo {
  value: string;
  viewValue: string;
}

interface Account {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addsubaccount',
  templateUrl: './addsubaccount.component.html',
  styleUrls: ['./addsubaccount.component.css']
})
export class AddsubaccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedValue: string;
  selectedCar: string;

  Geos: Geo[] = [
    {value: 'steak-0', viewValue: 'Geo 1'},
    {value: 'pizza-1', viewValue: 'Geo 2'},
    {value: 'tacos-2', viewValue: 'Geo 3'}
  ];

  Accounts: Account[] = [
    {value: 'steak-0', viewValue: 'Account 1'},
    {value: 'pizza-1', viewValue: 'Account 2'},
    {value: 'tacos-2', viewValue: 'Account 3'}
  ];

}
