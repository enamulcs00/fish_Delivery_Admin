import { Component, AfterViewInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl,FormGroup} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {
  constructor(private router: Router) {
    if (!sessionStorage.getItem("token")) this.router.navigate(["/login"]);
  }

  ngAfterViewInit() {}
}
