import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { NotificationService } from "src/app/services/notification.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-notificationhistory",
  templateUrl: "./notificationhistory.component.html",
  styleUrls: ["./notificationhistory.component.css"],
})
export class NotificationhistoryComponent implements OnInit {
  closeResult: string;
  totalNotifications: any;
  notificationData: any;
  page: any=10;
  pageindec: any=1;
  searchitem: any;
  searchValue: any;
  noDataToggle: boolean=false;
  permissions: any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  viewPermission:boolean = false;
  message: any;

  constructor(
    private modalService: NgbModal,
    private Srvc: NotificationService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNotifications();

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.addPermission = true;
      this.editPermission = true;
      this.viewPermission = true;
    } else {
      this.addPermission = this.permissions[7].isAdd;
      this.editPermission = this.permissions[7].isEdit;
      this.viewPermission = this.permissions[7].isView;
    }
  }

  getNotifications() {
    const data = {
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      search: this.searchitem == null ? "" : this.searchitem,
    };

    this.Srvc.getNotificationHistory(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        if (res?.data?.count){
          this.noDataToggle = false;
          this.notificationData = res?.data?.notifiocationList;
        }
        else {
          this.noDataToggle = true;
        }

        this.totalNotifications = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  // Search
  timer: any;
  search(event) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.searchValue = event.target.value;
      this.getNotifications();
    }, 1000);
  }

  // Pagination
  onPaginateChange(event) {
    this.page = event.pageSize;
    if (event.pageIndex === 0) {
      this.pageindec = 1;
    } else {
      this.pageindec = event.pageIndex + 1;
    }
    this.getNotifications();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    this.modalService.dismissAll();
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  reviewModal(review,message) {
    this.message = message;
    this.modalService.open(review, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  addreviewModal(addreview) {
    this.modalService.open(addreview, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  reviewDeleteModal(reviewDelete) {
    this.modalService.open(reviewDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
