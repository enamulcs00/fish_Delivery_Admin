import { Component } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { OnboardingService } from "src/app/services/onboarding.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changePassword.component.html",
})
export class changepasswordComponent {
  changePswdform: FormGroup;
  confirmErrorr: boolean;
  pass: any = {};
  submitted: boolean = false;

  constructor(
    private route: Router,
    private _rout: ActivatedRoute,
    private formBuilder: FormBuilder,
    private Srvc: OnboardingService
  ) {
    this.changePswdform = this.formBuilder.group({
      password: ["", Validators.required],
      newpassword: ["", Validators.required],
      confirmpassword: ["", Validators.required],
    });
  }

  redirect() {
    this.route.navigate(["/dashboard"]);
    this.changePswdform.reset();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.route.navigate(["/login"]);
  }

  onPasswordSubmit(f: NgForm) {
    this.submitted = true;
    let form = {
      oldPassword: this.pass.oldPassword,
      newPassword: this.pass.newPassword,
      confirmPassword: this.pass.cpassword,
    };
    if (form.newPassword === form.confirmPassword){
      let data = {
        oldPassword: this.pass.oldPassword,
        newPassword: this.pass.newPassword
      };
      this.Srvc.changePassword(data).subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.sessionTerminate();
        }
        if (res.statusCode == 200) {
          Swal.fire("Success", "Password changed succesfully", "success");
          this.changePswdform.reset();
          this.route.navigate(["/dashboard"]);
        } else {
          Swal.fire("Oops", res.message, "error");
        }
      });
    }
    else {
      Swal.fire("Oops", "New password & confirm password doesn't match", "error");
    }

  }
}
