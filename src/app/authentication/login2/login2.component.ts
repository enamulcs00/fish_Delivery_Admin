import { Component } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { OnboardingService } from "src/app/services/onboarding.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login2.component.html",
  styleUrls: ["./login2.scss"],
})
export class Login2Component {
  Uloginform: FormGroup;
  submitted: boolean = false;
  forgotPass: FormGroup;
  constructor(
    private route: Router,
    private _rout: ActivatedRoute,
    private formBuilder: FormBuilder,
    private Srvc: OnboardingService,
    private toastr: ToastrService
  ) {
    if (this.Srvc.isLoggedIn()) {
      this.route.navigate(["/dashboard"]);
    }

    this.Uloginform = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      rememberMe: [""],
    });

    this.forgotPass = this.formBuilder.group({
      forgotname: ["", [Validators.required, Validators.email]],
    });

    if (localStorage.getItem("remember")) {
      let formData = JSON.parse(localStorage.getItem("remember"));
      this.Uloginform.patchValue({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
    }
  }

  // Login
  loginAdmin() {
    this.submitted = true;
    const data = {
      email: this.Uloginform.controls["email"].value,
      password: this.Uloginform.controls["password"].value,
    };
    this.Srvc.login(data).subscribe((res: any) => {
      if (res.statusCode==200) {
        sessionStorage.setItem("token", res.data.accessToken);
        if (this.Uloginform.value.rememberMe) {
          localStorage.setItem(
            "remember",
            JSON.stringify(this.Uloginform.value)
          );
        } else {
          localStorage.removeItem("remember");
        }
        this.route.navigate(["/dashboard"]);
        this.toastr.success("Login Successful", "Welcome Back", {
          timeOut: 2000,
        });
      }
      else {
        Swal.fire("Oops.", res.message, "error");
      }
    });
  }

  loginform = true;
  recoverform = false;

  // Back button on Forgot password page
  back() {
    this.forgotPass.reset();
    this.loginform = true;
    this.recoverform = false;
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  // Login Form error handling
  public errorHandling = (control: string, error: string) => {
    return this.Uloginform.controls[control].hasError(error);
  };

  // Forgot Password error handling
  public errorHandlingfog = (control: string, error: string) => {
    return this.forgotPass.controls[control].hasError(error);
  };

  // Forgot Password
  forgotPassword() {
    this.submitted = true;
    const data = {
      email: this.forgotPass.controls["forgotname"].value,
    };
    if (this.forgotPass.valid) {
      this.Srvc.forgotPassword(data).subscribe((res: any) => {

        if (res.statusCode == 200) {

          Swal.fire(
            this.forgotPass.controls["forgotname"].value,
            "Password reset link sent on email",
            "success"
          );
          this.forgotPass.reset();
          this.loginform = true;
          this.recoverform = false;
        }
        else{
          Swal.fire("Oops", res.message, "error");
        }
      });
    }
  }
}
