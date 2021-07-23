import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UsersService } from "src/app/services/users.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";

export interface UserData {
  name: string;
  completedOrders: string;
  id: string;
  cancelledOrders: string;
  groups: string;
  contact: string;
  date: string;
  status: string;
  action: string;
  events: string;
  hosted: string;
}
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  closeResult: string;
  alterImage: any = "assets/images/users/admin.png";
  baseURL: any = "http://15.207.74.128:9041";

  //table: any

  displayedColumns: string[] = []
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  page: any = 10;
  pageindec: any = 1;
  searchitem: any;
  totalUsers: any;
  deleteID: any;
  searchValue: any;
  btnStatus: any = "all";
  localID: any;
  userData: any;
  submitted: boolean = false;
  dialCodeList: any;
  permissions: any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  viewPermission: boolean = false;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private Srvc: UsersService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    this.dataSource = new MatTableDataSource(this.table);
  }
  ngOnInit(): void {
    this.getAllUsers();
    this.getCountries();
    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.addPermission = true;
      this.editPermission = true;
      this.viewPermission = true;
    } else {
      this.addPermission = this.permissions[1].isAdd;
      this.editPermission = this.permissions[1].isEdit;
      this.viewPermission = this.permissions[1].isView;
    }
    if (this.editPermission){
      this.displayedColumns=[
        "serial_no",
        "name",
        "id",
        "contact",
        "date",
        "events",
        "hosted",
        "groups",
        "status",
        "action",
      ];
    }
    if (!this.editPermission){
      this.displayedColumns=[
        "serial_no",
        "name",
        "id",
        "contact",
        "date",
        "events",
        "hosted",
        "groups",
        "action",
      ];
    }
  }

  getAllUsers() {
    const data = {
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      search: this.searchitem == null ? "" : this.searchitem,
      isBlocked: this.btnStatus,
    };
    if (data.isBlocked == "all") {
      delete data.isBlocked;
    }

    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.dataSource = new MatTableDataSource(res?.data?.user);
        this.totalUsers = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.editUserForm.controls[control].hasError(error);
  };

  // Change isActive Status of User
  changeStatus(event, id) {
    const data = {
      userId: id,
      isBlocked: event.checked,
    };
    if (event.checked) {
      data.isBlocked = false;
    }
    if (!event.checked) {
      data.isBlocked = true;
    }

    this.Srvc.updateUser(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Updated", "User status successfully changed", "success");
        this.getAllUsers();
      } else {
        Swal.fire("Error", res.message, "error");
      }
    });
  }

  downloadCSV(){
    this.Srvc.downloadCSV().subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        window.open(res?.data?.redirection);
      } else {
        Swal.fire("Error", res.message, "error");
      }
    });
  }

  // Filter by Status(Active/Inactive)
  filterStatus(value) {
    this.btnStatus = value;
    this.getAllUsers();
  }

  // Search
  timer: any;
  search(event) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.searchValue = event.target.value;
      this.getAllUsers();
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
    this.getAllUsers();
  }

  // Delete User
  delete() {
    const data = {
      userId: this.deleteID,
      isDeleted: true,
    };
    this.Srvc.updateUser(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Deleted", "User deleted successfully", "success");
        this.modalService.dismissAll();
        this.getAllUsers();
      } else {
        Swal.fire("Oops", "Failed to delete User", "error");
      }
    });
  }

  // Route to View
  sendIDview(id) {
    this.router.navigate(["/pages/users_detail"], { queryParams: { id: id } });
  }

  // Logout if Token is invalid
  sessionTerminate() {
    this.modalService.dismissAll();
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  discountModal(discount) {
    this.modalService.open(discount, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  table = [
    {
      name: "Sandy",
      id: "#sand334553",
      contact: "+91-33434343",
      date: "10/10/20",
      events: "50",
      completedOrders: "50",
      cancelledOrders: "0",
      hosted: "0",
      groups: "50",
      status: "",
      action: "1",
    },
    {
      name: "Rohan",
      id: "#rohan334553",
      contact: "+91-33434343",
      date: "10/10/20",
      events: "45",
      completedOrders: "10",
      cancelledOrders: "0",
      hosted: "30",
      groups: "40",
      status: "",
      action: "1",
    },
    {
      name: "john",
      id: "#rohan334553",
      contact: "+91-33434343",
      date: "10/10/20",
      events: "54",
      completedOrders: "20",
      cancelledOrders: "10",
      hosted: "10",
      groups: "30",
      status: "",
      action: "1",
    },
  ];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // This is for the first modal
  open1(content1) {
    this.modalService
      .open(content1, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
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
  userDeleteModal(userDelete, id) {
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

  editUserForm = this.formBuilder.group({
    firstName: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    lastName: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    dialCode: ["", [Validators.required]],
    phoneNo: [
      "",
      [Validators.required, Validators.minLength(7), Validators.maxLength(15)],
    ],
  });

  // Update User Details
  updateUser() {
    this.submitted = true;
    if (this.editUserForm.valid) {
      const body = {
        userId: this.localID,
        firstName: this.editUserForm.controls["firstName"].value,
        lastName: this.editUserForm.controls["lastName"].value,
        phoneNo: this.editUserForm.controls["phoneNo"].value,
        dialCode: this.editUserForm.controls["dialCode"].value,
      };
      // console.log(body);
      // return;

      this.Srvc.updateUser(body).subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.sessionTerminate();
        }
        if (res.statusCode == 200) {
          this.modalService.dismissAll();
          Swal.fire("Updated", "User updated successfully", "success");
          this.submitted = false;
          this.editUserForm.reset();
          this.getAllUsers();
        } else {
          Swal.fire("Oops", res.message, "error");
        }
      });
    } else {
      this.toaster.error("Please enter all the required fields", "Error", {
        timeOut: 2000,
      });
    }
  }

  cancel() {
    this.editUserForm.reset();
    this.modalService.dismissAll();
  }

  // Get Country Code
  getCountries() {
    this.Srvc.getCountry().subscribe((data: any) => {
      this.dialCodeList = data;
    });
  }

  // Avoid empty Blank Space
  avoidBlankSpace(e, ref) {
    if (!ref.length) {
      e.preventDefault();
    }
  }

  // Alphabatic text with Space only
  alphabate(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode == 32
    ) {
      return true;
    }
    return false;
  }

  // Allow Numberic input only
  phoneNoInput(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
  }

  // Alphabatic text without Space
  textOnly(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    ) {
      return true;
    }
    return false;
  }

  addUserModal(addUser, id) {
    this.localID = id;
    let data = {
      userId: this.localID,
    };
    console.log(data);
    this.Srvc.getUser(data).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.editUserForm.controls["firstName"].setValue(
          res?.data?.user?.firstName
        );
        this.editUserForm.controls["lastName"].setValue(
          res?.data?.user?.lastName
        );
        this.editUserForm.controls["dialCode"].setValue(
          res?.data?.user?.dialCode
        );
        this.editUserForm.controls["phoneNo"].setValue(
          res?.data?.user?.phoneNo
        );
      } else {
        Swal.fire(
          "Server Error",
          "Failed to retrieve data from Server",
          "error"
        );
      }
    });
    this.modalService.open(addUser, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
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
