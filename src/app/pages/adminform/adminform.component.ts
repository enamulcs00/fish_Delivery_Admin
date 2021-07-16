import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "./../../services/admin.service";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import Swal from "sweetalert2";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-adminform",
  templateUrl: "./adminform.component.html",
  styleUrls: ["./adminform.component.css"],
})
export class AdminformComponent implements OnInit {
  dialCodeList: any;
  submitted: boolean = false;
  imageResPath: any;
  file: any;
  fileName: any="Choose File";
  imageFlag: boolean;

  constructor(
    private Srvc: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
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
    image: ["", Validators.required],

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
      console.log(obj);
      // return;
      this.Srvc.addAdmin(obj).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toastr.success("Sub Admin added Successfully");
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
}
