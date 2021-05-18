import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  closeResult: string;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  boxDeleteModal(boxDelete) {
    this.modalService.open(boxDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
  }
  inventoryModal(inventory) {
    this.modalService.open(inventory, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }

  
}
