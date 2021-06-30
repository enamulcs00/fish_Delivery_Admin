import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
export interface UserData {
  Images: string,
  EventName:string,
  // Eventtype: string,
  Event_type: string,
  datetime: string,
  Duration:string,
  Durationtime:string,
  Durationdate:string,
  box:string;
  action:string,
  location:string,
  invited:string,
  invited2:string,
  guest:string,
  attendees:string,
  Waiting:string,
  messagescount:string,
  likes:string,
  polls:string,
}
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  closeResult: string;
  displayedColumns: string[] = [ 'Images', 'EventName', 'Event_type','datetime','box','Duration', 'Durationtime', 'Durationdate','location', 'polls', 'invited', 'invited2', 'guest', 'attendees', 'Waiting', 'messagescount', 'likes','action'];
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
      Images: "assets/images/gallery/wedding.jpg",
      EventName:"Event 1",
      Event_type: 'Public',
      // Eventtype: 'Drink',
      datetime: "05/05/21, 10:20 AM",
      box:"Description will be shown here....",
      Duration:"2 Days",
      Durationtime:"10:00 AM - 10:00 PM",
      Durationdate: "10/10/20 - 12/10/20",
      location:"London",
      polls:"View",
      invited: "150",
      invited2: "10",
      guest: "20",
      attendees: "45",
      Waiting: "15",
      messagescount: "250",
      likes: "30",
      action:"0",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName:"Event 2",
      Event_type: 'Private',
      // Eventtype: 'Drink',
      datetime: "05/05/21, 11:20 AM",
      box:"Description will be shown here....",
      Duration:"3 Days",
      Durationtime:"10:00 AM - 10:00 PM",
      Durationdate: "10/10/20 - 12/10/20",
      location:"London",
      polls:"View",
      invited: "150",
      invited2: "15",
      guest: "20",
      attendees: "45",
      Waiting: "15",
      messagescount: "250",
      likes: "30",
      action:"1",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName:"Event 3",
      Event_type: 'Public',
      // Eventtype: 'Drink',
      datetime: "05/05/21, 12:20 AM",
      box:"Description will be shown here....",
      Duration:"2 Days",
      Durationtime:"10:00 AM - 10:00 PM",
      Durationdate: "10/10/20 - 12/10/20",
      location:"London",
      polls:"View",
      invited: "150",
      invited2: "5",
      guest: "20",
      attendees: "45",
      Waiting: "15",
      messagescount: "250",
      likes: "30",
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
  carModal2(car2) {
    this.modalService.open(car2, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  pollsmodal(polls) {
    this.modalService.open(polls, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  editpollmodal(editpoll) {
    this.modalService.dismissAll();
    this.modalService.open(editpoll, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  invitemodal(invite) {
    this.modalService.dismissAll();
    this.modalService.open(invite, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
}
