import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { NotificationService } from "src/app/services/notification.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  submitted: boolean = false;
  usersData: any;
  permissions: any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  viewPermission:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private Srvc: NotificationService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    this.notificationForm = formBuilder.group({
      notification: ["", Validators.required],
      users: ["", Validators.required],
      title: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(35),
        ],
      ],
      message: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
    });
    this.notificationForm.controls["users"].disable();
  }

  ngOnInit(): void {
    this.getAllUsers();

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

  submit() {
    this.submitted = true;
    if (this.notificationForm.valid) {
      let obj = {
        msgType: this.notificationForm.value.notification,
        userId: this.notificationForm.value.users,
        title: this.notificationForm.value.title,
        message: this.notificationForm.value.message,
      };
      if (obj.msgType=='particular'){
        obj.msgType = 0
      }
      if (obj.msgType=='broadcast'){
        obj.msgType = 1
      }
      if (obj.msgType==1){
        delete obj.userId
      }
      // console.log(obj);
      // return;
      this.Srvc.sendNotification(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            Swal.fire("Success", "Notification sent", "success");
            this.submitted = false;
            this.notificationForm.reset();
            // this.router.navigate(["/pages/drivers"]);
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

  getAllUsers() {
    const data = {
      limit: 10000000,
      page: 1,
      search: "",
    };


    this.userService.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.usersData = res?.data?.user;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  disableField() {
    if (this.notificationForm.controls.notification.value == "particular"){
      this.notificationForm.controls["users"].enable();
    }
    else {
      this.notificationForm.controls["users"].disable();
    }
  }

  // Avoid empty Blank Space
  avoidBlankSpace(e, ref) {
    if (!ref.length) {
      e.preventDefault();
    }
  }

  // Error Handling
  public errorHandling = (control: string, error: string) => {
    return this.notificationForm.controls[control].hasError(error);
  };


  toppings = new FormControl();
  toppingList: string[] = ["Particular UserIDs", "Broadcast Notification"];

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
