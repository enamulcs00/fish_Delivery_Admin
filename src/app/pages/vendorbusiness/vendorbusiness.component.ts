import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-vendorbusiness',
  templateUrl: './vendorbusiness.component.html',
  styleUrls: ['./vendorbusiness.component.css']
})
export class VendorbusinessComponent implements OnInit {

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
  }

  
  deleteBoxModal(userDelete) {
    this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }

  addBusinessModel(addsubCategory) {
    this.modalService.open(addsubCategory, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  editBusinessModel(addCategory) {
    this.modalService.open(addCategory, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
}
