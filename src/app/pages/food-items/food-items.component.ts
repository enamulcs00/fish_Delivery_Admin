import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { GroupsService } from "src/app/services/groups.service";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";

export interface UserData {
  Images: string;
  EventName: string;
  Eventtype: string;
  driver: string;
  Date: string;
  Duration: string;
  email: string;
  groupdescription: string;
  // status:string,
  action: string;
  // location:string,
  orderdate: string;
  deliverydate: string;
  Ordertype: string;
  // foodStatus:string,
  orderStatus: string;
}
@Component({
  selector: "app-food-items",
  templateUrl: "./food-items.component.html",
  styleUrls: ["./food-items.component.scss"],
})
export class FoodItemsComponent implements OnInit {
  closeResult: string;
  displayedColumns: string[] = [
    "Images",
    "EventName",
    "Eventtype",
    "Date",
    "email",
    "groupdescription",
    "Duration",
    "action",
  ];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  page: any=10;
  pageindec: any;
  searchitem: any;
  btnStatus: any=0;
  groupData: any;
  totalGroups: any;
  searchValue: any;
  pageindecUser: any;
  searchitemUser: any;
  pageUser: any=5;
  usersData: any;
  totalUsers: any;
  searchValueUser: any;
  visibleToNonMembers:boolean=false;
  addGroupForm: FormGroup;
  usersArray: any=[];
  submitted: boolean=false;
  imageResPath: any;
  file: any;
  constructor(private modalService: NgbModal,
    private Srvc: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private usersService: UsersService) {
    // this.dataSource = new MatTableDataSource(this.table);
    this.addGroupForm = formBuilder.group({
      groupName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
      groupFor: ["", [Validators.required]],
      date: ["", [Validators.required]],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  toppings = new FormControl();
  toppingList: string[] = [
    "Jamas Thomas",
    "Rony Roy",
    "Vicky Andy",
    "john Vick",
    "Alex Harry",
    "Harry Roy",
  ];
  // dishType: string[] = ['Soya Chap', 'Burger','Sandwich'];
  // cusinine: string[] = ['Indian', 'Italian ', 'Chiness',];

  ngOnInit(): void {
    this.getAllGroups();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // Get All Groups
  getAllGroups() {
    const data = {
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      search: this.searchitem == null ? "" : this.searchitem,
      type: this.btnStatus
    };

    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        if (res?.data?.count) {
          this.groupData = res?.data?.eventData;
          this.dataSource = new MatTableDataSource(res?.data?.eventData);
        } else {
          this.dataSource = null;
          this.toaster.error("No data found", "Oops", {
            timeOut: 2000,
          });
        }

        this.totalGroups = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  // Get Users listing
  getUsers() {
    const data = {
      limit: this.pageUser,
      page: this.pageindecUser == null ? 1 : this.pageindecUser,
      search: this.searchitemUser == null ? "" : this.searchitemUser,
    };
    this.usersService.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.usersData = res?.data?.user;
        this.totalUsers = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Failed to load Users data", {
          timeOut: 2000,
        });
      }
    });
  }

  // Search
  timer1: any;
  usersSearch(event) {
    window.clearTimeout(this.timer1);
    this.timer1 = window.setTimeout(() => {
      this.searchValueUser = event.target.value;
      this.getUsers();
    }, 1000);
  }

  // Pagination
  onPaginateChangeUser(event) {
    this.pageUser = event.pageSize;
    if (event.pageIndex === 0) {
      this.pageindecUser = 1;
    } else {
      this.pageindecUser = event.pageIndex + 1;
    }
    this.getUsers();
  }

  // Filter by Status(Public/Private)
  filterStatus(value) {
    this.btnStatus = value;
    this.getAllGroups();
  }

  // Search
  timer: any;
  search(event) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.searchValue = event.target.value;
      this.getAllGroups();
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
    this.getAllGroups();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  table = [
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName: "Group 1",
      Eventtype: "Public",
      Date: "05/05/21",
      Duration: "yes",
      email: "20",
      groupdescription: "This is Description of this group",
      // location:"yes",
      Ordertype: "Delivery",
      driver: "Andrew Tye",
      orderdate: "12-05-2021/13:45",
      deliverydate: "12-05-2021/15:45",
      // foodStatus:"Pending and not processed for Pick-Up",
      orderStatus: "Pending",
      totalSales: "500",
      action: "0",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName: "Group 2",
      Eventtype: "Private",
      Date: "05/05/21",
      Duration: "Yes",
      email: "25",
      groupdescription: "This is Description of this group",
      // location:"Yes",
      Ordertype: "Drive thru",
      driver: "Andrew Tye",
      orderdate: "12-05-2021/13:45",
      deliverydate: "12-05-2021/15:45",
      // foodStatus:"On The Way",
      orderStatus: "Accepted",
      totalSales: "500",
      action: "1",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName: "Group 3",
      Eventtype: "Public",
      Date: "05/05/21",
      Duration: "No",
      email: "10",
      groupdescription: "This is Description of this group",
      // location:"Yes",
      Ordertype: "Delivery",
      driver: "Andrew Tye",
      orderdate: "12-05-2021/13:45",
      deliverydate: "12-05-2021/15:45",
      // foodStatus:"On The Way",
      orderStatus: "Accepted",
      totalSales: "400",
      action: "1",
    },
  ];

  userDeleteModal(userDelete) {
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  Adddetails(Adddetail) {
    this.modalService.open(Adddetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
  eventsedit(eventedit) {
    this.modalService.open(eventedit, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  eventdetails(eventdetail) {
    this.modalService.open(eventdetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  carModal(car) {
    this.modalService.open(car, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  invitemodal(invite) {
    this.getUsers();
    this.modalService.dismissAll();
    this.modalService.open(invite, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg"
    });
  }

  // Push the selected Users ID in a Array
  inviteUsers(event, id) {
    if (event.target.checked) {
      this.usersArray.push(id);
    } else {
      this.usersArray.splice(this.usersArray.indexOf(id), 1);
    }
  }

  // Error Handling
  public errorHandling = (control: string, error: string) => {
    return this.addGroupForm.controls[control].hasError(error);
  };

  // Cancel form & reset values
  cancelForm() {
    this.modalService.dismissAll();
    this.usersArray = [];
    this.addGroupForm.reset();
    this.submitted=false;
    this.imageResPath=null;
  }

  // Add Group on Submit
  submitGroup() {
    this.submitted = true;
    if (this.addGroupForm.valid) {
      let obj = {
        invite: this.usersArray,
        name: this.addGroupForm.value.groupName,
        groupType: this.addGroupForm.value.groupFor,
        date: this.addGroupForm.value.date,
        description: this.addGroupForm.value.description,
        visibileTo:this.visibleToNonMembers,
        image:this.imageResPath
      };

      if (!this.imageResPath){
        delete obj.image
      }

      console.log(obj);
      return;
      this.Srvc.addGroup(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            this.submitted = false;
            this.addGroupForm.reset();
            this.usersArray = [];
            this.imageResPath=null;
            this.modalService.dismissAll();
            Swal.fire("Success", res.message, "success");
            this.getAllGroups();
          } else {
            Swal.fire("Oops", res.message, "error");
          }
        },
        (error) => {
          Swal.fire("Oops", "Something went wrong", "error");
        }
      );
    } else {
      this.toaster.error("Please fill all the required fields");
    }
  }

  changeVisibility(event){
    this.visibleToNonMembers = event.checked;
    console.log(this.visibleToNonMembers);
  }

  // Image Upload
  upload(evt) {
    var files = evt.target.files;
    this.file = files[0];

    if (files && this.file) {
      const formData = new FormData();
      formData.append("file", this.file);
      this.Srvc.uploadFile(formData).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success("Image Selected", "Success", {
            timeOut: 2000,
          });
          this.imageResPath = res?.data?.image;
        } else {
          Swal.fire("Oops", "Failed to upload Photo", "error");
        }
      });
    }
  }
}
