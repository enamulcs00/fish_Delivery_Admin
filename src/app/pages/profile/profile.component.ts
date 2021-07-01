import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { OnboardingService } from "src/app/services/onboarding.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {
  @ViewChild("placeRef") placesRef: GooglePlaceDirective;

  signUpform: FormGroup;
  submitted: boolean = false;
  baseURL: string;
  imgURL: string | ArrayBuffer;
  name: any;
  email: any;
  phoneNo: any;
  dialCode: any;
  countryList: any;
  CountryCode: any;
  file: any;
  imagePath: any;
  imageResPath: any;
  dialCodeList: any;
  imageCheck: any;
  alterImage:string="../../../assets/images/users/admin.png";

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private Srvc: OnboardingService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    this.signUpform = formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],

      phoneNo: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(13),
        ],
      ],
      dialCode: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(5)],
      ]
    });
  }

  ngOnInit() {
    this.getAdmin();
    this.getCountries();
  }

  public errorHandling = (control: string, error: string) => {
    return this.signUpform.controls[control].hasError(error);
  };

  getAdmin() {
    this.Srvc.getProfile().subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode==200) {
        this.baseURL = "http://15.207.74.128:9041";
        this.Srvc.searchdata();
        this.signUpform.controls["firstName"].setValue(res.data.firstName);
        this.signUpform.controls["lastName"].setValue(res.data.lastName);
        this.signUpform.controls["phoneNo"].setValue(res.data.phoneNo);
        this.signUpform.controls["dialCode"].setValue(res.data.dialCode);
        this.signUpform.controls["email"].setValue(res.data.email);

        this.imageCheck = res?.data?.image
        this.imgURL = res?.data?.image;
        this.name = res?.data?.fullName;
        this.email = res?.data?.email;
        this.dialCode = res?.data?.dialCode;
        this.phoneNo = res?.data?.phoneNo;
      } else {
        this.toaster.error("Failed to retrieve data from Server");
      }
    });
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this._route.navigate(["/login"]);
  }

  // Update Admin Details
  updateProfile() {
    this.submitted = true;
    if (this.signUpform.valid) {

        const body = {
          firstName: this.signUpform.controls["firstName"].value,
          lastName: this.signUpform.controls["lastName"].value,
          phoneNo: this.signUpform.controls["phoneNo"].value,
          email: this.signUpform.controls["email"].value,
          dialCode: this.signUpform.controls["dialCode"].value,
          image: this.imageResPath,
        };
        if (!this.imageResPath){
          delete body.image
        }

        this.Srvc.updateAdmin(body).subscribe((res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode==200) {
            Swal.fire("Updated", "Updated successfully", "success");
            this.submitted = false;
            this.signUpform.reset();
            this.getAdmin();
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

  // Image Upload
  upload(evt) {
    var files = evt.target.files;
    this.file = files[0];

    if (files && this.file) {
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
      const formData = new FormData();
      formData.append("file", this.file);
      this.Srvc.uploadFile(formData).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.toaster.success("Image Selected", "Success", {
            timeOut: 2000,
          });
          this.imageResPath = res?.data?.image;
        } else {
          Swal.fire("Oops", "Failed to update Photo", "error");
        }
      });
    }
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
}
