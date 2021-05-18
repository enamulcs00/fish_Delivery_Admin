import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
export interface UserData {
  name: string,
  completedOrders:string,
  // id: string,
  cancelledOrders:string,
  totalOrders:string,
  paymentnotcomplete:string,
  contact:string,
  email:string;
 status:string,
  action:string,
  address:string,
  pendingOrders:string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  closeResult: string;

  //table: any
  displayedColumns: string[] = [ 'name' ,'email','contact','address', 'completedOrders', 'cancelledOrders', 'paymentnotcomplete','status','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource(this.table);
  }
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
      // id: "#sand334553",
      contact:"+91-33434343",
      email:"sand@example.com",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      completedOrders:"50",
      cancelledOrders:"0",
      paymentnotcomplete:"0",
      pendingOrders:"0",
      totalOrders:"50",
      status:"",
      action:"1",
    },
    {
      name: 'Rohan',
      // id: "#rohan334553",
      contact:"+91-33434343",
      email:"sand@example.com",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      completedOrders:"10",
      cancelledOrders:"0",
      paymentnotcomplete:"0",
      pendingOrders:"30",
      totalOrders:"40",
      status:"",
      action:"1",
    },
    {
      name: 'john',
      // id: "#rohan334553",
      contact:"+91-33434343",
      email:"sand@example.com",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      completedOrders:"20",
      cancelledOrders:"10",
      paymentnotcomplete:"0",
      pendingOrders:"10",
      totalOrders:"30",
      status:"",
      action:"1",
    },

  ]
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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
userDetailModal(userDetail) {
  this.modalService.open(userDetail, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
addUserModal(addUser) {
  this.modalService.open(addUser, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
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
