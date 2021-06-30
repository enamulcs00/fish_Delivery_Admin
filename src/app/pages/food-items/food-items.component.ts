import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
export interface UserData {
  Images: string,
  EventName:string,
  Eventtype: string,
  driver:string,
  Date: string,
  Duration:string,
  email:string;
  groupdescription:string;
 // status:string,
  action:string,
  // location:string,
  orderdate:string,
  deliverydate:string,
  Ordertype:string,
  // foodStatus:string,
  orderStatus:string,
}
@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.scss']
})
export class FoodItemsComponent implements OnInit {

  closeResult: string;
  displayedColumns: string[] = [ 'Images','EventName','Eventtype' ,'Date', 'email', 'groupdescription','Duration','action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource(this.table);
  }

  toppings = new FormControl();
  toppingList: string[] = ['Jamas Thomas', 'Rony Roy', 'Vicky Andy', 'john Vick', 'Alex Harry', 'Harry Roy'];
  // dishType: string[] = ['Soya Chap', 'Burger','Sandwich'];
  // cusinine: string[] = ['Indian', 'Italian ', 'Chiness',];

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  table = [
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName:"Group 1",
      Eventtype: 'Public',
      Date: "05/05/21",
      Duration:"yes",
      email:"20",
      groupdescription:"This is Description of this group",
      // location:"yes",
      Ordertype:"Delivery",
      driver:"Andrew Tye",
      orderdate:"12-05-2021/13:45",
      deliverydate:"12-05-2021/15:45",
      // foodStatus:"Pending and not processed for Pick-Up",
      orderStatus:"Pending",
      totalSales:"500",
      action:"0",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName:"Group 2",
      Eventtype: 'Private',
      Date: "05/05/21",
      Duration:"Yes",
      email:"25",
      groupdescription:"This is Description of this group",
      // location:"Yes",
      Ordertype:"Drive thru",
      driver:"Andrew Tye",
      orderdate:"12-05-2021/13:45",
      deliverydate:"12-05-2021/15:45",
      // foodStatus:"On The Way",
      orderStatus:"Accepted",
      totalSales:"500",
      action:"1",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName:"Group 3",
      Eventtype: 'Public',
      Date: "05/05/21",
      Duration:"No",
      email:"10",
      groupdescription:"This is Description of this group",
      // location:"Yes",
      Ordertype:"Delivery",
      driver:"Andrew Tye",
      orderdate:"12-05-2021/13:45",
      deliverydate:"12-05-2021/15:45",
      // foodStatus:"On The Way",
      orderStatus:"Accepted",
      totalSales:"400",
      action:"1",
    },

  ]

  userDeleteModal(userDelete) {
    this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }
  Adddetails(Adddetail) {
    this.modalService.open(Adddetail, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  eventsedit(eventedit) {
  this.modalService.open(eventedit, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  eventdetails(eventdetail) {
    this.modalService.open(eventdetail, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  carModal(car) {
    this.modalService.open(car, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  invitemodal(invite) {
    this.modalService.dismissAll();
    this.modalService.open(invite, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
}
