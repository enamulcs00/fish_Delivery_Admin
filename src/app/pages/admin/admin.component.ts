import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "./../../services/admin.service";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  page: any=10;
  pageindec: any;
  searchitem: any;
  btnStatus: any='all';
  filterButton:any='All'
  adminData: any;
  totalAdmin: any;
  searchValue: any;
  alterImage:string="../../../assets/images/users/admin.png";
  constructor(
    private modalService: NgbModal,
    private Srvc: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    const data = {
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      search: this.searchitem == null ? "" : this.searchitem,
      type: this.btnStatus,
    };
    if (this.btnStatus == "all") {
      delete data.type;
    }

    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.adminData = res?.data?.checkAdmin;
        this.totalAdmin = res?.data?.count;
      } else {
        this.toastr.error(res.message, "Error", {
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
      this.getAllAdmins();
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
    this.getAllAdmins();
  }

  // Filter by Status(Active/Inactive)
  filterStatus(value,name) {
    this.filterButton=name;
    this.btnStatus = value;
    this.getAllAdmins();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  // This is for the first modal
  openWindowCustomClass(content3) {
    this.modalService.open(content3, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  userprofileModal(userDelete) {
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  userDeleteModal(userDelete) {
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  userDetailModal(userDetail) {
    this.modalService.open(userDetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  addUserModal(addUser) {
    this.modalService.open(addUser, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  vendorConfirmModal(vendorConfirm) {
    this.modalService.open(vendorConfirm, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  vendorUnconfirmModal(vendorUnconfirm) {
    this.modalService.open(vendorUnconfirm, {
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
