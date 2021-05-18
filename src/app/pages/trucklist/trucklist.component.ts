import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-trucklist',
  templateUrl: './trucklist.component.html',
  styleUrls: ['./trucklist.component.css']
})
export class TrucklistComponent implements OnInit {

  constructor(private modalService: NgbModal) {
    
  }

  ngOnInit(): void {
  }
  userDeleteModal(userDelete) {
    this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }
  editTruckModal(edittruck) {
    this.modalService.open(edittruck, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  addTruckModal(addtruck) {
    this.modalService.open(addtruck, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  truckdocumentModal(truckdocuments) {
    this.modalService.open(truckdocuments, {backdropClass: 'light-blue-backdrop',centered: true,size: 'md'});
  }
}
