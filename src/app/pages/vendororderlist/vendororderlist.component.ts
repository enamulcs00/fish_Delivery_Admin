import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
export interface UserData {
  hotelName:string,
  name: string,    
  driver:string,
  id: string,    
  contact:string,
  // email:string;
 // status:string,
  action:string,
  address:string,
  orderdate:string,
  deliverydate:string,
  Ordertype:string,
  // foodStatus:string,
  orderStatus:string,
}

@Component({
  selector: 'app-vendororderlist',
  templateUrl: './vendororderlist.component.html',
  styleUrls: ['./vendororderlist.component.css']
})
export class VendororderlistComponent implements OnInit {
  closeResult: string;
  displayedColumns: string[] = [ 'hotelName','name' ,'id','contact','address','Ordertype','driver','orderdate','deliverydate','orderStatus','totalSales','action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource(this.table);
  }
  toppings = new FormControl();
  toppingList: string[] = ['Jamas Thomas', 'Rony Roy', 'Vicky Andy', 'john Vick', 'Alex Harry', 'Harry Roy'];
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  table = [
    {   
      hotelName:"Pharmacy",
      name: 'Sandy roy',   
      id: "#334553",    
      contact:"+91-33434343",
      // email:"Soya Chap",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
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
      hotelName:"Restaurant",
      name: 'Rohan Smith',   
      id: "#334553",  
      contact:"+91-33434343",
      // email:"Sandwich",  
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
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
      hotelName:"Grocery",
      name: 'john Doe',   
      id: "#34553",
      contact:"+91-33434343",
      // email:"Burger", 
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
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
  reviewModal(review) {
    this.modalService.open(review, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  orderConfirmModal(orderConfirm) {
    this.modalService.open(orderConfirm, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }
  changedriverModal(changedriver) {
    this.modalService.open(changedriver, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }
  carModal(car) {
    this.modalService.open(car, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }
  
}
