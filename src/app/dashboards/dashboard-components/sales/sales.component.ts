import { Component, AfterViewInit } from "@angular/core";
import { ChartType, ChartEvent } from "ng-chartist";
import * as c3 from "c3";
import { DashboardService } from "src/app/services/dashboard.service";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";

declare var require: any;

const data: any = require("./data.json");

export interface Chart {
  type: ChartType;
  data:any;
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
  // simpleForm: FormGroup;
  one:number=1;
  two:number=1;
  three:number=1;
  four:number=1;
  five:number=1;
  six:number=1;
  seven:number=1;
  eight:number=1;
  nine:number=1;
  ten:number=1;
  permissions: any;
  viewPermission: boolean = false;
  userCount=[];
  activeUserCount=[];
  eventCount=[];
  groupCount=[];
  attendingEventCount=[];
  groupMessageCount=[];
  totalMessageCount=[];
  eventMessageCount=[];
  likeCount=[];
  notificationCount=[];
  barChart1: Chart = {
    type: "Bar",
    data:{
      "labels": [],
      "series": [
          []
      ]
  },
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
  barChart5: Chart = {
    type: "Bar",
    data:{
      "labels": [],
      "series": [
          []
      ]
  },
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
  barChart2: Chart = {
    type: "Bar",
    data:{
      "labels": [],
      "series": [
          []
      ]
  },
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
  barChart3: Chart = {
    type: "Bar",
    data:{
      "labels": [],
      "series": [
          []
      ]
  },
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
  barChart4: Chart = {
    type: "Bar",
    data:{
      "labels": [],
      "series": [
          []
      ]
  },
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
    data:{
        "labels": [],
        "series": [
            []
        ]
    },
    options: {
      low: 0,
      height: 400,
      showArea: true,
      fullWidth: true,
    },
  };
  lineChart2: Chart = {
    type: "Line",
    data:{
        "labels": [],
        "series": [
            []
        ]
    },
    options: {
      low: 0,
      height: 400,
      showArea: true,
      fullWidth: true,
    },
  };
  lineChart3: Chart = {
    type: "Line",
    data:{
        "labels": [],
        "series": [
            []
        ]
    },
    options: {
      low: 0,
      height: 400,
      showArea: true,
      fullWidth: true,
    },
  };
  lineChart4: Chart = {
    type: "Line",
    data:{
        "labels": [],
        "series": [
            []
        ]
    },
    options: {
      low: 0,
      height: 400,
      showArea: true,
      fullWidth: true,
    },
  };
  lineChart5: Chart = {
    type: "Line",
    data:{
        "labels": [],
        "series": [
            []
        ]
    },
    options: {
      low: 0,
      height: 400,
      showArea: true,
      fullWidth: true,
    },
  };
  type: any;
  subType: any;
  totalCount: any;

  constructor(
    private Srvc: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    // this.simpleForm = this.formBuilder.group({
    //   one: [""],
    //   two: [""],
    //   three: [""],
    //   four: [""],
    //   five: [""],
    //   six: [""],
    //   seven: [""],
    //   eight: [""],
    //   nine: [""],
    //   ten: [""],
    // });
  }

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
     this.getTotal();

    this.permissions = JSON.parse(sessionStorage.getItem("permission"));
    if (this.permissions == null) {
      this.viewPermission = true;
    } else {
      this.viewPermission = this.permissions[0].isView;
    }
  }

  getData() {
    // this.emptyData();
    let data = {
      type:this.type,
      subType:this.subType
    };
    if (!this.type || !this.subType){
      delete data.type
      delete data.subType
    }
    // this.emptyData();

      this.Srvc.getAll(data).subscribe((res: any) => {
        // console.log(res.data);
        if (res.statusCode == 401) {
          this.sessionTerminate();
        }
        if (res.statusCode == 200) {

          for (const [key, value] of Object.entries(res.data.userCount)) {
            this.lineChart1.data.labels.push(value['name']);
            this.userCount.push(value['count']);

          }
          for (const [key, value] of Object.entries(res.data.eventCount)) {
            this.lineChart2.data.labels.push(value['name']);
            this.eventCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.totalMessageCount)) {
            this.lineChart3.data.labels.push(value['name']);
            this.totalMessageCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.likeCount)) {
            this.lineChart4.data.labels.push(value['name']);
            this.likeCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.activeUserCount)) {
            this.barChart1.data.labels.push(value['name']);
            this.activeUserCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.attendingEventCount)) {
            this.barChart2.data.labels.push(value['name']);
            this.attendingEventCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.groupMessageCount)) {
            this.barChart3.data.labels.push(value['name']);
            this.groupMessageCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.eventMessageCount)) {
            this.lineChart5.data.labels.push(value['name']);
            this.eventMessageCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.groupCount)) {
            this.barChart4.data.labels.push(value['name']);
            this.groupCount.push(value['count']);
          }
          for (const [key, value] of Object.entries(res.data.notificationCount)) {
            this.barChart5.data.labels.push(value['name']);
            this.notificationCount.push(value['count']);
          }
          this.lineChart1.data.series[0]=this.userCount;
          this.lineChart2.data.series[0]=this.eventCount;
          this.lineChart3.data.series[0]=this.totalMessageCount;
          this.lineChart4.data.series[0]=this.likeCount;
          this.lineChart5.data.series[0]=this.eventMessageCount;
          this.barChart1.data.series[0]=this.activeUserCount;
          this.barChart2.data.series[0]=this.attendingEventCount;
          this.barChart3.data.series[0]=this.groupMessageCount;
          this.barChart4.data.series[0]=this.groupCount;
          this.barChart5.data.series[0]=this.notificationCount;
          // console.log(this.lineChart1.data.labels);
        } else {
          this.toaster.error(res.message, "Error", {
            timeOut: 2000,
          });
        }
      });


  }

  emptyData(){
  this.userCount=[];
  this.activeUserCount=[];
  this.eventCount=[];
  this.groupCount=[];
  this.attendingEventCount=[];
  this.groupMessageCount=[];
  this.totalMessageCount=[];
  this.eventMessageCount=[];
  this.likeCount=[];
  this.notificationCount=[];
  this.lineChart1.data.labels=[];
  this.lineChart2.data.labels=[];
  this.lineChart3.data.labels=[];
  this.lineChart4.data.labels=[];
  this.lineChart5.data.labels=[];
  this.barChart1.data.labels=[];
  this.barChart2.data.labels=[];
  this.barChart3.data.labels=[];
  this.barChart4.data.labels=[];
  this.barChart5.data.labels=[];
  }

  getTotal() {
    this.Srvc.totalCount().subscribe((res: any) => {
      // console.log(res.data);
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.totalCount = res?.data
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

  filter(event,value){
    this.type = Number(event.target.value);
    this.subType = value;
    this.emptyData();
    this.getData();
    if (value==1){
      this.two =1;
      this.three=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==2){
      this.one =1
      this.three=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==3){
      this.one =1
      this.two=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==4){
      this.one =1
      this.three=1;
      this.two=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==5){
      this.one =1
      this.three=1;
      this.four=1;
      this.two=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==6){
      this.one =1
      this.three=1;
      this.four=1;
      this.five=1;
      this.two=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==7){
      this.one =1
      this.three=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.two=1;
      this.eight=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==8){
      this.one =1
      this.three=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.two=1;
      this.nine=1;
      this.ten=1;
    }
    if (value==9){
      this.one =1
      this.three=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.two=1;
      this.ten=1;
    }
    if (value==10){
      this.one =1
      this.three=1;
      this.four=1;
      this.five=1;
      this.six=1;
      this.seven=1;
      this.eight=1;
      this.nine=1;
      this.two=1;
    }

  }
}
