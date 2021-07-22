import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ReportService } from "src/app/services/report.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router, Routes } from "@angular/router";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.css"],
})
export class ReviewsComponent implements OnInit {
  closeResult: string;
  page: any=10;
  pageindec: any=1;
  searchitem: any;
  totalReports: any;
  alterImage: string = "../../../assets/images/users/admin.png";
  reportData: any;
  searchValue: any;
  noDataToggle: boolean=false;
  permissions: any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  viewPermission:boolean = false;
  deleteID: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private Srvc: ReportService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllReports();

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.addPermission = true;
      this.editPermission = true;
      this.viewPermission = true;
    } else {
      this.addPermission = this.permissions[5].isAdd;
      this.editPermission = this.permissions[5].isEdit;
      this.viewPermission = this.permissions[5].isView;
    }
  }

  getAllReports() {
    const data = {
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      search: this.searchitem == null ? "" : this.searchitem,
    };
    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        if (res?.data?.count){
          this.noDataToggle = false;
          this.reportData = res?.data?.reportList;
        }
        else {
          this.noDataToggle = true;
        }

        this.totalReports = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  delete(){
    let body = {
      reportId:this.deleteID
    }
    this.Srvc.deleteReport(body).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Deleted", "Report successfully deleted", "success");
        this.modalService.dismissAll();
        this.getAllReports();
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
      this.getAllReports();
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
    this.getAllReports();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    this.modalService.dismissAll();
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }


  reviewModal(review) {
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
  reviewDeleteModal(reviewDelete,id) {
    this.deleteID = id;
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
