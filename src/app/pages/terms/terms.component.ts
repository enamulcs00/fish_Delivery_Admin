import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { CmsService } from "src/app/services/cms.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  termsForm: FormGroup;
  terms: any;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private Srvc: CmsService,
    private formBuilder: FormBuilder
  ) {
    this.termsForm = formBuilder.group({
      data: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  // Get Terms Data
  getData() {
    this.Srvc.getAll().subscribe((res: any) => {
      if (res.statusCode == 401) {
        Swal.fire("Oops", "Session is Terminated", "error");
        sessionStorage.removeItem("token");
        this._route.navigate(["/login"]);
      }
      if (res.statusCode == 200) {
        this.terms = res?.data?.termsAndConditions;
        this.termsForm.controls["data"].setValue(this.terms);
      }
    });
  }

  // Update Privacy
  update() {
    this.submitted = true;
    if (this.termsForm.valid) {
      const body = {
        termsAndConditions: this.termsForm.controls["data"].value,
      };
      this.Srvc.update(body).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.submitted = false;
          Swal.fire(
            "Updated",
            "Terms & Conditions Successfully Updated",
            "success"
          );
          this.getData();
          // this.Srvc.searchdata();
        } else {
          Swal.fire("Oops", res.message, "error");
        }
      });
    } else {
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  // Error Handling
  public errorHandling = (control: string, error: string) => {
    return this.termsForm.controls[control].hasError(error);
  };

  // Don't allow blank input
  avoidBlank(e, ref) {
    if (!ref.length) {
      e.preventDefault();
    }
  }

}
