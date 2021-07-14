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
  page: any = 10;
  pageindec: any;
  searchitem: any;
  btnStatus: any = 0;
  isEdit: boolean = false;
  showToggle: boolean=false;
  filterName:string='All';
  groupData: any;
  totalGroups: any;
  searchValue: any;
  pageindecUser: any;
  fileName: any = "Choose File";
  searchitemUser: any;
  pageUser: any = 5;
  usersData: any=[];
  totalUsers: any;
  usersInvited:any;
  searchValueUser: any;
  visibleToNonMembers: boolean = false;
  addGroupForm: FormGroup;
  usersArray: any = [];
  submitted: boolean = false;
  imageResPath: any;
  file: any;
  isVisiblityChecked: any;
  groupID: any;
  isImageAttached: boolean = false;
  deleteID: any;
  memberList: any;
  groupRemoveID: any;
  noDataToggle: boolean=false;
  tempArray: any=[];
  saveStateArray: any=[];
  saveEditStateArray: any;
  constructor(
    private modalService: NgbModal,
    private Srvc: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
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
      // date: ["", [Validators.required]],
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
    this.getUsers();
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
      type: this.btnStatus,
    };

    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        if (res?.data?.count) {
          this.noDataToggle = false;
          this.groupData = res?.data?.groupData;
          this.dataSource = new MatTableDataSource(res?.data?.groupData);
          this.totalGroups = res?.data?.count;
        } else {
          this.dataSource = null;
          this.noDataToggle = true;
          // this.toaster.error("No data found", "Oops", {
          //   timeOut: 2000,
          // });
        }

        this.totalGroups = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  showInvites(e){
    if (e.target.value=="2"){
      this.showToggle = true;
    }
    else {
      this.showToggle = false;
    }

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
  filterStatus(value,name) {
    this.filterName=name;
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

  // Avoid Space on Empty input
  doSomething(e, ref) {
    if (!ref.length) {
      e.preventDefault();
    }
  }


  userDeleteModal(userDelete, id) {
    this.deleteID = id;
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  Adddetails(Adddetail) {
    this.tempArray = [];
    for (var user of this.usersArray) {
      this.tempArray.push(user);
    }
    this.modalService.open(Adddetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }

  eventdetails(eventdetail) {
    this.modalService.open(eventdetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  carModal(car,id) {
    const filteredData = this.groupData.find(
      (element: any) => element._id === id
    );
    this.groupRemoveID = id;
    this.memberList = filteredData.join;
    this.modalService.open(car, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  invitemodal(invite) {
    this.pageindecUser=1;
    this.getUsers();
    this.modalService.open(invite, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }

  // Push the selected Users ID in a Array
  inviteUsers(event, id) {
    if (event.target.checked) {
      this.tempArray.push(id);
    } else {
      this.tempArray.splice(this.tempArray.indexOf(id), 1);
    }
  }

  saveArray(){
    this.usersArray = this.tempArray;
    this.saveStateArray = this.usersArray;
    this.saveEditStateArray = this.usersArray;
    this.tempArray = [].concat(this.saveStateArray);
  }

  removeArray(){
    this.usersArray = this.saveStateArray;
    this.tempArray=[].concat(this.usersArray);
  }

  removeEditArray(){
    this.usersArray = this.saveEditStateArray;
    this.tempArray = [].concat(this.usersArray);
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
    this.submitted = false;
    this.imageResPath = null;
    this.isEdit = false;
    this.fileName = "Choose File";
    this.isImageAttached = false;
  }

  eventsedit(Adddetail, row) {
    this.groupID = row?._id;
    this.isEdit = true;
    this.submitted = false;
    this.addGroupForm.controls["groupName"].setValue(row?.name);
    this.addGroupForm.controls["groupFor"].setValue(row?.groupType);
    this.addGroupForm.controls["description"].setValue(row?.description);

    this.isVisiblityChecked = row?.visibileTo;
    if (row?.image) {
      this.fileName = "Image.jpg";
    }
    // Push the User ID in User Array
    for (var user of row?.invite) {
      this.usersArray.push(user._id);
    }


    for (var user of row?.invite) {
      this.saveStateArray.push(user._id);
    }
    this.saveEditStateArray = []
    this.tempArray = [];
    for (var user of this.usersArray) {
      this.tempArray.push(user);
    }
    for (var user of this.usersArray) {
      this.saveEditStateArray.push(user);
    }


    if (row?.groupType==1){
      this.showToggle = false;
    }
    if (row?.groupType==2){
      this.showToggle = true;
    }

    this.modalService.open(Adddetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }

  // Add Group on Submit
  submitGroup() {
    this.submitted = true;
    if (this.addGroupForm.valid) {
      if (this.isImageAttached){


      let obj = {
        invite: this.usersArray,
        name: this.addGroupForm.value.groupName,
        groupType: this.addGroupForm.value.groupFor,
        // date: this.addGroupForm.value.date,
        description: this.addGroupForm.value.description,
        visibileTo: this.visibleToNonMembers,
        image: this.imageResPath,
      };
      if (obj.groupType==1){
        obj.visibileTo=true;
      }
      // console.log(obj);
      // return;
      this.Srvc.addGroup(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            this.submitted = false;
            this.addGroupForm.reset();
            this.usersArray = [];
            this.fileName = "Choose File";
            this.imageResPath = null;
            this.isImageAttached = false;
            this.showToggle=false;
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
        this.toaster.error("Please choose a Group image");
      }
    } else {
      this.toaster.error("Please fill all the required fields");
    }
  }

  changeVisibility(event) {
    this.visibleToNonMembers = event.checked;
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
          this.fileName = evt.target.files[0].name;
          this.toaster.success("Image Selected", "Success", {
            timeOut: 2000,
          });
          this.imageResPath = res?.data?.image;
          this.isImageAttached = true;
        } else {
          Swal.fire("Oops", "Failed to upload Photo", "error");
        }
      });
    }
  }

  // Edit Group on Submit
  editGroup() {
    this.submitted = true;
    if (this.addGroupForm.valid) {
      let obj = {
        groupId: this.groupID,
        invite: this.usersArray,
        name: this.addGroupForm.value.groupName,
        groupType: this.addGroupForm.value.groupFor,
        // date: this.addGroupForm.value.date,
        description: this.addGroupForm.value.description,
        visibileTo: this.visibleToNonMembers,
        image: this.imageResPath,
      };
      if (!this.isImageAttached) {
        delete obj.image;
      }

      // console.log(obj);
      // return;
      this.Srvc.updateGroup(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            this.submitted = false;
            this.addGroupForm.reset();
            this.usersArray = [];
            this.isEdit = false;
            this.showToggle=false;
            this.imageResPath = null;
            this.isImageAttached = false;
            this.modalService.dismissAll();
            this.fileName = "Choose File";
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
    }
    // else {
    //   this.toaster.error("Please choose group image");
    // }
    else {
      this.toaster.error("Please fill all the required fields");
    }
  }

  deleteGroup() {
    const data = {
      groupId: this.deleteID,
      isDeleted: true,
    };

    this.Srvc.updateGroup(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Deleted", "Group deleted successfully", "success");
        this.modalService.dismissAll();
        this.getAllGroups();
      } else {
        Swal.fire("Oops", "Failed to delete Group", "error");
      }
    });
  }

  // Remove a Member
  removeMember(id){
    const data = {
      groupId: this.groupRemoveID,
      userId: id,
    };

    this.Srvc.removeMember(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Removed", "Group member successfully removed", "success");
        this.getAllGroups();
        this.modalService.dismissAll();
        setTimeout(() => {
          document.getElementById(this.groupRemoveID).click();
        },100)
      } else {
        Swal.fire("Oops", "Failed to remove member", "error");
      }
    });
  }
}
