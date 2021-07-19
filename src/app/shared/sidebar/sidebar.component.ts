import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnboardingService } from 'src/app/services/onboarding.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: any[];
  permission: any;
  checkArr = [];
  // this is for the open close
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private Srvc: OnboardingService
  ) {}

  // End open close
  ngOnInit() {
    this.Srvc.getProfile().subscribe((res: any) => {
      if (res.data.role == 2) {
        this.permission = res?.data?.permission;
        // console.log(this.permission)
        sessionStorage.setItem("permission", JSON.stringify(this.permission));
        for (const [key, value] of Object.entries(this.permission)) {

          if (value['isView']) {
            this.checkArr.push(value['label']);
          }
        }

      }
      this.sidebarnavItems = ROUTES.filter((sidebarnavItem) => {
        if (res.data.role == 2) {
          for (let index = 0; index < this.checkArr.length; index++) {
            if (this.checkArr[index] == sidebarnavItem.title) {
              return sidebarnavItem;
            }
          }
        } else {
          return sidebarnavItem;
        }
      });
      //console.log(this.checkArr);
    });
  }
}
