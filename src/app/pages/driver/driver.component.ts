import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
export interface UserData {
  name: string,    
  completedOrders:string,
  id: string,    
  cancelledOrders:string,
  contact:string,
  email:string;
 status:string,
  action:string,
  address:string,
  totalOrders:string,
  pendingOrders:string,
  totalSales:string,
  document:string,  
  drivertype:string,
}
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  closeResult: string;
  displayedColumns: string[] = [ 'name' ,'id','email','contact','address','document','drivertype','completedOrders','cancelledOrders','pendingOrders','totalOrders','totalSales','status','action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource(this.table);
  }
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  discountModal(discount) {
    this.modalService.open(discount, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  table = [
    {    
      name: 'Sandy',   
      id: "#sand334553",    
      contact:"+91-33434343",
      email:"sand@example.com",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      drivertype:"Food Truck",
      document:'assets/images/gallery/driving-licence.jpg',
      completedOrders:"50",
      cancelledOrders:"0",
      pendingOrders:"0",
      totalOrders:"50",
      totalSales:"500",
      status:"",
      action:"0",      
    },
    {    
      name: 'Rohan',   
      id: "#rohan334553",  
      contact:"+91-33434343",
      email:"sand@example.com",  
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      drivertype:"Food Truck",
      document:'assets/images/gallery/driving-licence.jpg',
      completedOrders:"10",
      cancelledOrders:"0",
      pendingOrders:"30",
      totalOrders:"40",
      totalSales:"500",
      status:"",
      action:"1",      
    },
    {    
      name: 'john',   
      id: "#rohan334553",
      contact:"+91-33434343",
      email:"sand@example.com", 
      address:"#454 1st Block, Rammurthy, Bangalore-560016",  
      drivertype:"Grocery Delivery",
      document:'assets/images/gallery/driving-licence.jpg', 
      completedOrders:"20",
      cancelledOrders:"10",
      pendingOrders:"10",
      totalOrders:"30",
      totalSales:"400",
      status:"",
      action:"1",      
    },
   
  ]
  
 
  time = {hour: 13, minute: 30};
  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

// This is for the first modal
open1(content1) {
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
openWindowCustomClass(content3) {
  this.modalService.open(content3, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
userprofileModal(userDelete) {
  this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
userDeleteModal(userDelete) {
  this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
}
edituserModal(edituser) {
  this.modalService.open(edituser, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
addUserModal(addUser) {
  this.modalService.open(addUser, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
vendorConfirmModal(vendorConfirm) {
  this.modalService.open(vendorConfirm, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
vendorUnconfirmModal(vendorUnconfirm) {
  this.modalService.open(vendorUnconfirm, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
}
documentModal(document) {
  this.modalService.open(document, {backdropClass: 'light-blue-backdrop',centered: true,size: 'md'});
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}
