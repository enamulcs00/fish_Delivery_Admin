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
  page: any = 10;
  pageindec: any;
  searchitem: any;
  btnStatus: any = "all";
  filterButton: any = "All";
  adminData: any;
  totalAdmin: any;
  searchValue: any;
  alterImage: string = "../../../assets/images/users/admin.png";
  noDataToggle: boolean=false;
  deleteID: any;
  permissions: any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  viewPermission:boolean = false;
  constructor(
    private modalService: NgbModal,
    private Srvc: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAdmins();

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.addPermission = true;
      this.editPermission = true;
      this.viewPermission = true;
    } else {
      this.addPermission = this.permissions[2].isAdd;
      this.editPermission = this.permissions[2].isEdit;
      this.viewPermission = this.permissions[2].isView;
    }
    // console.log("Add",this.addPermission);
    // console.log("Edit",this.editPermission);
  }

  // Route to Edit
  sendID(id) {
    this.router.navigate(["/pages/manage_admin_edit"], {
      queryParams: { id: id },
    });
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
        if (res?.data?.count) {
          this.adminData = res?.data?.checkAdmin;

          this.noDataToggle = false;
        } else {
          this.noDataToggle = true;
        }
        this.totalAdmin = res?.data?.count;
      } else {
        this.toastr.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  // Change isActive Status of Admin
  changeStatus(status, id) {
    const data = {
      subAdminId: id,
      isBlocked: status,
    };
    if (status == "active") {
      data.isBlocked = false;
    }
    if (status == "inactive") {
      data.isBlocked = true;
    }

    this.Srvc.updateAdmin(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Updated", "Admin status successfully changed", "success");
        this.getAllAdmins();
      } else {
        Swal.fire("Error", res.message, "error");
      }
    });
  }

  // Change isActive Status of Admin
  delete() {
    const data = {
      subAdminId: this.deleteID,
      isDeleted: true,
    };

    this.Srvc.updateAdmin(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Deleted", "Admin successfully deleted", "success");
        this.modalService.dismissAll();
        this.getAllAdmins();
      } else {
        Swal.fire("Error", res.message, "error");
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
  filterStatus(value, name) {
    this.filterButton = name;
    this.btnStatus = value;
    this.getAllAdmins();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    this.modalService.dismissAll();
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
  userDeleteModal(userDelete,id) {
    this.deleteID = id;
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
