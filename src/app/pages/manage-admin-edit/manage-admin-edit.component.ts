import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "./../../services/admin.service";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-manage-admin-edit",
  templateUrl: "./manage-admin-edit.component.html",
  styleUrls: ["./manage-admin-edit.component.css"],
})
export class ManageAdminEditComponent implements OnInit {
  dialCodeList: any;
  submitted: boolean = false;
  imageResPath: any;
  file: any;
  fileName: any = "Choose File";
  imageFlag: boolean;
  localID: any;
  adminData: any;
  permissions: any;
  viewPermission:boolean = false;

  constructor(
    private Srvc: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _route:ActivatedRoute,
  ) {}

  addAdminForm = this.formBuilder.group({
    firstName: [
      "",
      [Validators.required, Validators.minLength(2), Validators.maxLength(35)],
    ],
    lastName: [
      "",
      [Validators.required, Validators.minLength(2), Validators.maxLength(35)],
    ],
    dialCode: ["", Validators.required],
    phoneNo: [
      "",
      [Validators.required, Validators.minLength(8), Validators.maxLength(15)],
    ],
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ],
    ],
    image: [""],

    //Dashboard Permissions
    isDashboardAdd: [false],
    isDashboardEdit: [false],
    isDashboardView: [false],

    // Users Permissions
    isUsersAdd: [false],
    isUsersEdit: [false],
    isUsersView: [false],

    // Admin Permissions
    isAdminAdd: [false],
    isAdminEdit: [false],
    isAdminView: [false],

    // Events Permissions
    isEventsAdd: [false],
    isEventsEdit: [false],
    isEventsView: [false],

    // Groups Permissions
    isGroupsAdd: [false],
    isGroupsEdit: [false],
    isGroupsView: [false],

    // Report Permissions
    isReportAdd: [false],
    isReportEdit: [false],
    isReportView: [false],

    // Event type Permissions
    isEventTypeAdd: [false],
    isEventTypeEdit: [false],
    isEventTypeView: [false],

    // Notification Permissions
    isNotificationAdd: [false],
    isNotificationEdit: [false],
    isNotificationView: [false],
  });

  ngOnInit(): void {
    this.getCountries();
    this._route.queryParams.subscribe((params) => {
      this.localID = params.id;
      this.getAdminDetails();
    });

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.viewPermission = true;
    } else {
      this.viewPermission = this.permissions[2].isView;
    }
  }

  getAdminDetails(){
    let body = {
      adminId : this.localID
    }
    this.Srvc.getAdmin(body).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }

      if (res.statusCode === 200) {
        this.addAdminForm.controls["firstName"].setValue(res?.data[0]?.firstName);
        this.addAdminForm.controls["lastName"].setValue(res?.data[0]?.lastName);
        this.addAdminForm.controls["email"].setValue(res?.data[0]?.email);
        this.addAdminForm.controls["dialCode"].setValue(res?.data[0]?.dialCode);
        this.addAdminForm.controls["phoneNo"].setValue(res?.data[0]?.phoneNo);

        // Dashboard Permission
        this.addAdminForm.controls["isDashboardAdd"].setValue(res?.data[0]?.permission[0].isAdd);
        this.addAdminForm.controls["isDashboardEdit"].setValue(res?.data[0]?.permission[0].isEdit);
        this.addAdminForm.controls["isDashboardView"].setValue(res?.data[0]?.permission[0].isView);

        // Users Permissions
        this.addAdminForm.controls["isUsersAdd"].setValue(res?.data[0]?.permission[1].isAdd);
        this.addAdminForm.controls["isUsersEdit"].setValue(res?.data[0]?.permission[1].isEdit);
        this.addAdminForm.controls["isUsersView"].setValue(res?.data[0]?.permission[1].isView);

        // Admin Permissions
        this.addAdminForm.controls["isAdminAdd"].setValue(res?.data[0]?.permission[2].isAdd);
        this.addAdminForm.controls["isAdminEdit"].setValue(res?.data[0]?.permission[2].isEdit);
        this.addAdminForm.controls["isAdminView"].setValue(res?.data[0]?.permission[2].isView);

        // Events Permissions
        this.addAdminForm.controls["isEventsAdd"].setValue(res?.data[0]?.permission[3].isAdd);
        this.addAdminForm.controls["isEventsEdit"].setValue(res?.data[0]?.permission[3].isEdit);
        this.addAdminForm.controls["isEventsView"].setValue(res?.data[0]?.permission[3].isView);

        // Groups Permissions
        this.addAdminForm.controls["isGroupsAdd"].setValue(res?.data[0]?.permission[4].isAdd);
        this.addAdminForm.controls["isGroupsEdit"].setValue(res?.data[0]?.permission[4].isEdit);
        this.addAdminForm.controls["isGroupsView"].setValue(res?.data[0]?.permission[4].isView);

        // Report Permissions
        this.addAdminForm.controls["isReportAdd"].setValue(res?.data[0]?.permission[5].isAdd);
        this.addAdminForm.controls["isReportEdit"].setValue(res?.data[0]?.permission[5].isEdit);
        this.addAdminForm.controls["isReportView"].setValue(res?.data[0]?.permission[5].isView);

        // Event type Permissions
        this.addAdminForm.controls["isEventTypeAdd"].setValue(res?.data[0]?.permission[6].isAdd);
        this.addAdminForm.controls["isEventTypeEdit"].setValue(res?.data[0]?.permission[6].isEdit);
        this.addAdminForm.controls["isEventTypeView"].setValue(res?.data[0]?.permission[6].isView);

        // Notification Permissions
        this.addAdminForm.controls["isNotificationAdd"].setValue(res?.data[0]?.permission[7].isAdd);
        this.addAdminForm.controls["isNotificationEdit"].setValue(res?.data[0]?.permission[7].isEdit);
        this.addAdminForm.controls["isNotificationView"].setValue(res?.data[0]?.permission[7].isView);


        if ((res?.data[0]?.image)!=""){
          this.fileName="Image.jpg"
        }
        else
        {
          this.fileName="Choose File";
        }
      }
      else {
        this.toastr.error("Failed to load data , Server Error");
      }
    });
  }

  // Get Country Code
  getCountries() {
    this.Srvc.getCountry().subscribe((data: any) => {
      this.dialCodeList = data;
    });
  }

  // Submit Form
  addAdminData() {
    this.submitted = true;
    if (this.addAdminForm.valid) {
      let obj = {
        subAdminId: this.localID,
        firstName: this.addAdminForm.value.firstName,
        lastName: this.addAdminForm.value.lastName,
        name: this.addAdminForm.value.firstName+' '+this.addAdminForm.value.lastName,
        dialCode : this.addAdminForm.value.dialCode,
        phoneNo: this.addAdminForm.value.phoneNo,
        email: this.addAdminForm.value.email,
        image: this.imageResPath,
        permission: [
          {
            label: "Dashboard",
            isAdd: this.addAdminForm.value.isDashboardAdd,
            isEdit: this.addAdminForm.value.isDashboardEdit,
            isDelete: this.addAdminForm.value.isDashboardEdit,
            isView: this.addAdminForm.value.isDashboardView,
          },
          {
            label: "Users",
            isAdd: this.addAdminForm.value.isUsersAdd,
            isEdit: this.addAdminForm.value.isUsersEdit,
            isDelete: this.addAdminForm.value.isUsersEdit,
            isView: this.addAdminForm.value.isUsersView,
          },
          {
            label: "Admin",
            isAdd: this.addAdminForm.value.isAdminAdd,
            isEdit: this.addAdminForm.value.isAdminEdit,
            isDelete: this.addAdminForm.value.isAdminEdit,
            isView: this.addAdminForm.value.isAdminView,
          },
          {
            label: "Events",
            isAdd: this.addAdminForm.value.isEventsAdd,
            isEdit: this.addAdminForm.value.isEventsEdit,
            isDelete: this.addAdminForm.value.isEventsEdit,
            isView: this.addAdminForm.value.isEventsView,
          },
          {
            label: "Groups",
            isAdd: this.addAdminForm.value.isGroupsAdd,
            isEdit: this.addAdminForm.value.isGroupsEdit,
            isDelete: this.addAdminForm.value.isGroupsEdit,
            isView: this.addAdminForm.value.isGroupsView,
          },
          {
            label: "Report",
            isAdd: this.addAdminForm.value.isReportAdd,
            isEdit: this.addAdminForm.value.isReportEdit,
            isDelete: this.addAdminForm.value.isReportEdit,
            isView: this.addAdminForm.value.isReportView,
          },
          {
            label: "Event Types",
            isAdd: this.addAdminForm.value.isEventTypeAdd,
            isEdit: this.addAdminForm.value.isEventTypeEdit,
            isDelete: this.addAdminForm.value.isEventTypeEdit,
            isView: this.addAdminForm.value.isEventTypeView,
          },
          {
            label: "Notification",
            isAdd: this.addAdminForm.value.isNotificationAdd,
            isEdit: this.addAdminForm.value.isNotificationEdit,
            isDelete: this.addAdminForm.value.isNotificationEdit,
            isView: this.addAdminForm.value.isNotificationView,
          },
        ],
      };
      if (!obj.image){
        delete obj.image
      }
      console.log(obj);
      // return;
      this.Srvc.updateAdmin(obj).subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.sessionTerminate();
        }
        if (res.statusCode === 200) {
          Swal.fire("Updated", "Admin details successfully updated", "success");
          this.addAdminForm.reset();
          this.submitted = false;
          this.router.navigate(["/pages/manage_admin"]);
        } else {
          Swal.fire("Oops", res.message, "error");
        }
      });
    } else {
      this.toastr.error("Please fill all the required fields");
    }
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }



  back() {
    this.router.navigate(["/pages/manage_admin"]);
    this.addAdminForm.reset();
  }

   // Error Handling Messages
   public errorHandling = (control: string, error: string) => {
    return this.addAdminForm.controls[control].hasError(error);
  };

  // Avoid Space on Empty input
  doSomething(e, ref) {
    if (!ref.length) {
      e.preventDefault();
    }
  }

  // Allow Numberic input only
  phoneNoInput(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
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

  // Image Select
  upload(e) {
    this.file = e.target.files[0];
    if (
      this.file.type == "image/png" ||
      this.file.type == "image/jpg" ||
      this.file.type == "image/jpeg"
    ) {
      const formData = new FormData();
      formData.append("file", this.file);
      this.Srvc.uploadFile(formData).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.imageResPath = res?.data?.image;
          this.fileName = this.file.name;
          this.addAdminForm.controls["image"].setValue(this.file.name);
          this.imageFlag = false;
          this.toastr.success("Image Selected", "Success", {
            timeOut: 2000,
          });
        } else {
          Swal.fire("Oops", res.message, "error");
        }
      });
    }
  }

  dashboardCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isDashboardView"].setValue(true)
    }
  }

  usersCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isUsersView"].setValue(true)
    }
  }

  adminCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isAdminView"].setValue(true)
    }
  }

  eventsCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isEventsView"].setValue(true)
    }
  }

  groupsCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isGroupsView"].setValue(true)
    }
  }

  reportCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isReportView"].setValue(true)
    }
  }

  eventTypeCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isEventTypeView"].setValue(true)
    }
  }

  notificationCheck(e){
    if (e.target.checked){
      this.addAdminForm.controls["isNotificationView"].setValue(true)
    }
  }
}
