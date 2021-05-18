import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {

  closeResult: string;

  //table: any
  displayedColumns: string[] = [ 'name', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private modalService: NgbModal) {
    this.dataSource = new MatTableDataSource(this.table);
  }
  reviewModal(review) {
    this.modalService.open(review, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


  deletemodal(deletereason) {
    this.modalService.open(deletereason, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }

}
