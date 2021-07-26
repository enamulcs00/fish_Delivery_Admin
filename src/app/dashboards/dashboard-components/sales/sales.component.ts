import { Component, AfterViewInit } from "@angular/core";
import * as Chartist from "chartist";
import { ChartType, ChartEvent } from "ng-chartist";
import * as c3 from "c3";
import { DashboardService } from "src/app/services/dashboard.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router, Routes } from "@angular/router";

declare var require: any;

const data: any = require("./data.json");

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements AfterViewInit {
  permissions: any;
  viewPermission: boolean = false;

  barChart1: Chart = {
    type: "Bar",
    data: data["Bar"],
    options: {
      seriesBarDistance: 15,
      height: 400,
      axisX: {
        showGrid: false,
        offset: 70,
      },
      axisY: {
        showGrid: true,
        offset: 50,
      },
    },
    responsiveOptions: [
      [
        "screen and (min-width: 640px)",
        {
          axisX: {
            labelInterpolationFnc: function (
              value: number,
              index: number
            ): string {
              return index % 1 === 0 ? `${value}` : null;
            },
          },
        },
      ],
    ],
  };

  // Line chart
  lineChart1: Chart = {
    type: "Line",
    data: data["LineWithArea"],
    options: {
      low: 0,
      height: 400,
      showArea: true,
      fullWidth: true,
    },
  };
  type: any;
  subType: any;
  constructor(
    private Srvc: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngAfterViewInit() {
    const chart2 = c3.generate({
      bindto: "#product-sales",
      data: {
        columns: [
          ["user", 5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
          // ['Ipad', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3]
        ],
        type: "spline",
      },
      axis: {
        y: {
          show: true,
          tick: {
            count: 0,
            outer: false,
          },
        },
        x: {
          show: true,
        },
      },
      padding: {
        top: 40,
        right: 10,
        bottom: 40,
        left: 20,
      },
      point: {
        r: 0,
      },
      legend: {
        hide: false,
      },
      color: {
        pattern: ["#fbb03b"],
      },
    });
  }

  ngOnInit(): void {
    this.getData();

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.viewPermission = true;
    } else {
      this.viewPermission = this.permissions[0].isView;
    }
  }

  getData() {
    const data = {
      type: this.type,
      subType: this.subType,
    };
    if (!this.type){
      delete data.type
    }
    if (!this.subType){
      delete data.subType
    }

    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        // this.dataSource = new MatTableDataSource(res?.data?.user);
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
