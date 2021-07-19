import { Component, OnInit } from "@angular/core";
import { EventTypeService } from "src/app/services/event-type.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"],
})
export class CalculatorComponent implements OnInit {
  ArrayImage: any = [];
  responseArray: any;
  uploadArray: any = [];
  arrayLength: any;
  imageResPath: any;
  deleteID: any;
  tempImag: any;
  indexValue: any;
  isUpload:boolean=true;
  permissions: any;
  addPermission: boolean = false;
  editPermission: boolean = false;
  viewPermission:boolean = false;

  constructor(
    private modalService: NgbModal,
    private Srvc: EventTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAll();

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.addPermission = true;
      this.editPermission = true;
      this.viewPermission = true;
    } else {
      this.addPermission = this.permissions[6].isAdd;
      this.editPermission = this.permissions[6].isEdit;
      this.viewPermission = this.permissions[6].isView;
    }
    // console.log("Add",this.addPermission);
    // console.log("Edit",this.editPermission);
  }

  getAll() {
    this.Srvc.getEventType().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.arrayLength = res.data.length;
        for (var x of res.data) {
          this.ArrayImage.push({ id: x._id, image: x.eventImage });
        }
      }
    });
  }

  Remove(index, id, userDelete) {
    this.deleteID = id;
    // this.ArrayImage.splice(index, 1);
    this.indexValue = index;
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }

  // Delete User
  delete() {
    if (this.deleteID) {
      const data = {
        id: this.deleteID,
      };
      this.Srvc.delete(data).subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.sessionTerminate();
        }
        if (res.statusCode == 200) {
          Swal.fire("Deleted", "Event type deleted successfully", "success");
          this.modalService.dismissAll();
          this.ArrayImage.splice(this.indexValue, 1);
          this.ArrayImage = [];
          this.getAll();
          this.isUpload=true;
        } else {
          Swal.fire("Oops", res.message, "error");
        }
      });
    } else {
      this.modalService.dismissAll();
      this.ArrayImage.splice(this.indexValue, 1);
      this.isUpload=true;
    }
  }

  uploadGallery(event) {
    // console.log(event);
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    var img = new Image();
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        img.src = event.target.result;
        img.onload = () => {
          var height = img.height;
          var width = img.width;
          if (width === height && width <= 512) {
            this.ArrayImage.push({ image: reader.result });
            this.uploadArray.push(reader.result);

            const formData = new FormData();
            formData.append("file", file);
            this.Srvc.uploadFile(formData).subscribe((res: any) => {
              if (res.statusCode === 200) {
                this.imageResPath = res?.data?.image;
                this.isUpload= false;
                this.toaster.success("", "Image Selected", {
                  timeOut: 2000,
                });
              } else {
                Swal.fire("Oops", "Failed to update Photo", "error");
              }
            });
          } else {
            this.toaster.error("Image should be in square with 1:1 ratio");
          }
        };
      };
    }
  }

  uploadImage() {
    const body = {
      eventNumber: this.arrayLength + 1,
      eventImage: this.imageResPath,
    };
    if (!this.imageResPath) {
      delete body.eventImage;
    }

    this.Srvc.addImage(body).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Success", "Event image added successfully ", "success");
        this.ArrayImage = [];
        this.isUpload = true;
        this.getAll();
      } else {
        Swal.fire("Oops", res.message, "error");
      }
    });
  }

  // Logout if Token is invalid
  sessionTerminate() {
    this.modalService.dismissAll();
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
