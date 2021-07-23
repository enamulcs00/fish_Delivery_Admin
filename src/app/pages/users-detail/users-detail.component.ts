import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UsersService } from "src/app/services/users.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

export interface UserData {
  hotelName: string;
  productname: string;
  id: string;
  orderdate: string;
  deliverydate: string;
  delivery_man: string;
  price: string;
  status: string;
}
@Component({
  selector: "app-users-detail",
  templateUrl: "./users-detail.component.html",
  styleUrls: ["./users-detail.component.css"],
})
export class UsersDetailComponent implements AfterViewInit {
  closeResult: string;
  //table: any
  displayedColumns: string[] = [
    "hotelName",
    "productname",
    "id",
    "orderdate",
    "deliverydate",
    "delivery_man",
    "price",
    "status",
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  localID: any;
  page: any=10;
  pageindec: any=1;
  userDetail: any;
  typeOfEvent: any=1;
  listingData: any;
  total: any;
  noData: boolean=false;
  moment: any = moment;
  isAttended:boolean = true;
  isHosted:boolean = false;
  isGroup:boolean = false;

  constructor(
    private modalService: NgbModal,
    private Srvc: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(this.table);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.localID = params.id;
      this.getUser();
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getUser() {
    let body = {
      userId : this.localID,
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      filterType: this.typeOfEvent
    }
    this.Srvc.getUser(body).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.userDetail = res?.data?.user
        this.listingData = res?.data?.data
        this.total = res?.data?.count;
        if (this.total){
          this.noData = false;
        }
        if (!this.total){
          this.noData = true;
        }
      }
    });
  }

  // Pagination
  onPaginateChange(event) {
    this.page = event.pageSize;
    if (event.pageIndex === 0) {
      this.pageindec = 1;
    } else {
      this.pageindec = event.pageIndex + 1;
    }
    this.getUser();
  }

  changeFilterType(filter){
    this.typeOfEvent = filter;
    if (this.typeOfEvent == 1){
      this.isAttended = true;
      this.isHosted = false;
      this.isGroup = false;
    }
    if (this.typeOfEvent == 2){
      this.isAttended = false;
      this.isHosted = true;
      this.isGroup = false;
    }
    if (this.typeOfEvent == 3){
      this.isAttended = false;
      this.isHosted = false;
      this.isGroup = true;
    }
    this.page= 10;
    this.pageindec = 1;
    this.getUser();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    this.modalService.dismissAll();
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  // Calculate Duration(Difference b/w Start date & End date)
  getdiffDates(row) {
    if (row?.startDate && row?.endDate) {
      var date1 = new Date(row.startDate);
      var date2 = new Date(row.endDate);
      var Time = date2.getTime() - date1.getTime();

      var Days = Time / (1000 * 3600 * 24); //Diference in Days
      let hours = (Days - Math.floor(Days)) * 24;
      if (hours == 0) {
        if (Days == 1 || Days == 0) {
          return Math.abs(Math.floor(Days)) + " Day ";
        } else {
          return Math.abs(Math.floor(Days)) + " Days ";
        }
      } else {
        return (
          Math.abs(Math.floor(Days)) + " days " + hours.toFixed(2) + " hours"
        );
      }
    }
    else {
      return "-"
    }
  }

  discountModal(discount) {
    this.modalService.open(discount, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  table = [
    {
      hotelName: "Leuven",
      productname: "Soya Chap",
      id: "#454545",
      orderdate: "12-05-2021/12:00",
      deliverydate: "12-05-2021/13:00",
      delivery_man: "John",
      price: "50",
      status: "Completed",
    },
    {
      hotelName: "Mcdonalds",
      productname: "Burger",
      id: "#454545",
      orderdate: "12-05-2021/11:00",
      deliverydate: "12-05-2021/14:00",
      delivery_man: "John",
      price: "50",
      status: "Cancelled",
    },
    {
      hotelName: "Mcdonalds",
      productname: "Burger",
      id: "#454545",
      orderdate: "12-05-2021/11:00",
      deliverydate: "12-05-2021/14:00",
      delivery_man: "John",
      price: "50",
      status: "Pending",
    },
  ];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
