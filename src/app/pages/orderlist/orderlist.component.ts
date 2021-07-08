import { Component, OnInit, ViewChild } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { EventsService } from "src/app/services/events.service";
import Swal from "sweetalert2";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";
import { EventTypeService } from "src/app/services/event-type.service";
import { NgForm, FormGroup, FormControl } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";


export interface UserData {
  Images: string;
  EventName: string;
  // Eventtype: string,
  Event_type: string;
  datetime: string;
  Duration: string;
  Durationtime: string;
  Durationdate: string;
  box: string;
  action: string;
  location: string;
  invited: string;
  invited2: string;
  guest: string;
  attendees: string;
  Waiting: string;
  messagescount: string;
  likes: string;
  polls: string;


}
declare var $: any;
@Component({
  selector: "app-orderlist",
  templateUrl: "./orderlist.component.html",
  styleUrls: ["./orderlist.component.css"],
})
export class OrderlistComponent implements OnInit {
  moment: any = moment;
  closeResult: string;
  displayedColumns: string[] = [
    "Images",
    "EventName",
    "Event_type",
    "datetime",
    "box",
    "Duration",
    "Durationtime",
    "Durationdate",
    "location",
    "polls",
    "invited",
    "invited2",
    "guest",
    "attendees",
    "Waiting",
    "messagescount",
    "likes",
    "action",
  ];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  page: any = 10;
  pageindec: any;
  searchitem: any;
  searchitemUser: any;
  btnStatus: any = 0;
  filterType: any = 0;
  totalEvents: any;
  addEventForm: FormGroup;
  addPollForm: FormGroup;
  searchValue: any;
  pollsData: any;
  eventData: any;
  waitingList: any;
  selectedIcon: any = false;

  ArrayImage: any = [];
  usersData: any;
  searchValueUser: any;
  pageUser: any = 5;
  pageindecUser: any;
  totalUsers: any;
  usersArray: any = [];
  iconID: any;
  submitted: boolean=false;
  isAdd : boolean = false;
  isEdit: boolean = false;
  editId: any;
  eventID: any;
  isModalEnable: boolean = false;
  editEventID: any;
  constructor(
    private modalService: NgbModal,
    private Srvc: EventsService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private eventTypeService: EventTypeService,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.addEventForm = formBuilder.group({
      eventName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
      eventFor: ["", [Validators.required]],
      icon: [""],

      maxLength: [
        "",
        [
          Validators.required,
          Validators.min(0),
          Validators.max(9999),
          Validators.minLength(1),
          Validators.maxLength(4),
        ],
      ],

      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      endTime: ["", [Validators.required]],

      address: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(150),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(750),
        ],
      ],
    });

    this.addPollForm = formBuilder.group({
      pollName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(35),
        ],
      ],
    });
  }
  toppings = new FormControl();
  toppingList: string[] = [
    "Jamas Thomas",
    "Rony Roy",
    "Vicky Andy",
    "john Vick",
    "Alex Harry",
    "Harry Roy",
  ];
  ngOnInit(): void {
    this.getAllEvents();
    this.getEventType();
  }

  cancelForm() {
    this.modalService.dismissAll();
    this.usersArray = [];
    this.iconID = null;
    this.addEventForm.reset();
    // this.ArrayImage = [];
    this.submitted=false;
  }

  // Calculate Duration(Difference b/w Start date & End date)
  getdiffDates(row) {
    var date1 = new Date(row.startDate);
    var date2 = new Date(row.endDate);
    var Time = date2.getTime() - date1.getTime();
    var Days = Time / (1000 * 3600 * 24); //Diference in Days
    let hours = (Days - Math.floor(Days)) * 24;
    if (hours == 0) {
      if (Days <= 1) {
        return Math.floor(Days) + " Day ";
      } else {
        return Math.floor(Days) + " Days ";
      }
    } else {
      return Math.floor(Days) + " days " + hours + " hours";
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // Get All Events
  getAllEvents() {
    const data = {
      limit: this.page,
      page: this.pageindec == null ? 1 : this.pageindec,
      search: this.searchitem == null ? "" : this.searchitem,
      type: this.btnStatus,
      filterType: this.filterType,
    };

    this.Srvc.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        if (res?.data?.count) {
          this.eventData = res?.data?.eventData;
          this.dataSource = new MatTableDataSource(res?.data?.eventData);
        } else {
          this.dataSource = null;
          this.toaster.error("No data found", "Oops", {
            timeOut: 2000,
          });
        }

        this.totalEvents = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Error", {
          timeOut: 2000,
        });
      }
    });
  }

  // Get Event Type Image
  getEventType() {
    const array=[];
    this.eventTypeService.getEventType().subscribe((res: any) => {
      if (res.statusCode == 200) {
        const array=[]
        for (var x of res.data) {
         array.push({ id: x._id, image: x.eventImage });
        }
        this.ArrayImage=array;
      }
    });
  }

  // Choose Event type icon
  selectIcon(id) {
    // console.log("Select Icon Called",this.ArrayImage);
    this.selectedIcon = true;
    let index = this.ArrayImage.findIndex((x) => x.id == id);
    if (index != -1) {
      this.ArrayImage = this.ArrayImage.map((x) => {
        x["isSelected"] = false;
        return x;
      });
      this.ArrayImage[index]["isSelected"] = true;
      // console.log();
    }
    this.iconID = id;
  }

  // Filter Type
  changeFilterType(filter) {
    this.filterType = filter;
    this.getAllEvents();
  }

  // Filter by Status(Public/Private)
  filterStatus(value) {
    this.btnStatus = value;
    this.getAllEvents();
  }

  // Search
  timer: any;
  search(event) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.searchValue = event.target.value;
      this.getAllEvents();
    }, 1000);
  }

  // Pagination
  onPaginateChange(event) {
    this.page = event.pageSize;
    if (event.pageIndex === 0) {
      this.pageindec = 1;
    } else {
      this.pageindec = event.pageIndex + 1;
    }
    this.getAllEvents();
  }

  // Logout if Token is invalid
  sessionTerminate() {
    Swal.fire("Oops", "Session is Terminated", "error");
    sessionStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  table = [
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName: "Event 1",
      Event_type: "Public",
      // Eventtype: 'Drink',
      datetime: "05/05/21, 10:20 AM",
      box: "Description will be shown here....",
      Duration: "2 Days",
      Durationtime: "10:00 AM - 10:00 PM",
      Durationdate: "10/10/20 - 12/10/20",
      location: "London",
      polls: "View",
      invited: "150",
      invited2: "10",
      guest: "20",
      attendees: "45",
      Waiting: "15",
      messagescount: "250",
      likes: "30",
      action: "0",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName: "Event 2",
      Event_type: "Private",
      // Eventtype: 'Drink',
      datetime: "05/05/21, 11:20 AM",
      box: "Description will be shown here....",
      Duration: "3 Days",
      Durationtime: "10:00 AM - 10:00 PM",
      Durationdate: "10/10/20 - 12/10/20",
      location: "London",
      polls: "View",
      invited: "150",
      invited2: "15",
      guest: "20",
      attendees: "45",
      Waiting: "15",
      messagescount: "250",
      likes: "30",
      action: "1",
    },
    {
      Images: "assets/images/gallery/wedding.jpg",
      EventName: "Event 3",
      Event_type: "Public",
      // Eventtype: 'Drink',
      datetime: "05/05/21, 12:20 AM",
      box: "Description will be shown here....",
      Duration: "2 Days",
      Durationtime: "10:00 AM - 10:00 PM",
      Durationdate: "10/10/20 - 12/10/20",
      location: "London",
      polls: "View",
      invited: "150",
      invited2: "5",
      guest: "20",
      attendees: "45",
      Waiting: "15",
      messagescount: "250",
      likes: "30",
      action: "1",
    },
  ];
  userDeleteModal(userDelete) {
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  Adddetails(Adddetail) {
    this.isAdd = true;
    this.isEdit = false;
    // this.getEventType();
    this.modalService.open(Adddetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
  eventsedit(Adddetail,row) {
    this.isAdd = false;
    this.isEdit = true;
    this.addEventForm.reset();
    this.usersArray = [];
    this.iconID = null;
    // this.ArrayImage = [];
    this.submitted=false;
    // this.getEventType();
    this.addEventForm.controls["eventName"].setValue(row?.eventName);
    this.addEventForm.controls["eventFor"].setValue(row?.eventFor);
    this.addEventForm.controls["maxLength"].setValue(row?.maxLength);
    this.addEventForm.controls["startDate"].setValue(moment(row?.startDate).format('YYYY-MM-DD'));
    this.addEventForm.controls["endDate"].setValue(moment(row?.endDate).format('YYYY-MM-DD'));
    this.addEventForm.controls["startTime"].setValue(row?.startTime);
    this.addEventForm.controls["endTime"].setValue(row?.endTime);
    this.addEventForm.controls["address"].setValue(row?.address);
    this.addEventForm.controls["description"].setValue(row?.description);

    // Push the User ID in User Array
    for (var user of row.invitedList){
      this.usersArray.push(user._id)
    };

    this.editEventID = row?._id;

    this.selectIcon(row?.eventType?._id);
    // console.log(row?.eventType?._id);



    this.modalService.open(Adddetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
  eventdetails(eventdetail) {
    this.modalService.open(eventdetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  carModal(car) {
    this.modalService.open(car, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  carModal2(car2, id) {
    const filteredData = this.eventData.find(
      (element: any) => element._id === id
    );
    this.waitingList = filteredData.waitingList;
    this.modalService.open(car2, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  pollsmodal(polls, id) {
    const filteredData = this.eventData.find(
      (element: any) => element._id === id
    );
    this.pollsData = filteredData.pollId;
    this.eventID = id;

    this.modalService.open(polls, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
  editpollmodal(editpoll) {
    this.modalService.open(editpoll, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,

    });

  }
  invitemodal(invite) {
    this.getUsers();
    // this.modalService.dismissAll();
    this.modalService.open(invite, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }

  // Get Users listing
  getUsers() {
    const data = {
      limit: this.pageUser,
      page: this.pageindecUser == null ? 1 : this.pageindecUser,
      search: this.searchitemUser == null ? "" : this.searchitemUser,
    };
    this.usersService.getAll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.usersData = res?.data?.user;
        this.totalUsers = res?.data?.count;
      } else {
        this.toaster.error(res.message, "Failed to load Users data", {
          timeOut: 2000,
        });
      }
    });
  }



  // Search
  timer1: any;
  usersSearch(event) {
    window.clearTimeout(this.timer1);
    this.timer1 = window.setTimeout(() => {
      this.searchValueUser = event.target.value;
      this.getUsers();
    }, 1000);
  }

  // Pagination
  onPaginateChangeUser(event) {
    this.pageUser = event.pageSize;
    if (event.pageIndex === 0) {
      this.pageindecUser = 1;
    } else {
      this.pageindecUser = event.pageIndex + 1;
    }
    this.getUsers();
  }

  // Push the selected Users ID in a Array
  inviteUsers(event, id) {
    if (event.target.checked) {
      this.usersArray.push(id);
    } else {
      this.usersArray.splice(this.usersArray.indexOf(id), 1);
    }
    // console.log(this.usersArray);
  }

  submitEvent() {
    this.submitted = true;
    if (this.addEventForm.valid) {
      let obj = {
        eventType: this.iconID,
        invitedList: this.usersArray,
        eventName: this.addEventForm.value.eventName,
        eventFor: this.addEventForm.value.eventFor,
        maxLength: this.addEventForm.value.maxLength,
        startDate: this.addEventForm.value.startDate,
        endDate: this.addEventForm.value.endDate,
        startTime: this.addEventForm.value.startTime,
        endTime: this.addEventForm.value.endTime,
        address: this.addEventForm.value.address,
        description: this.addEventForm.value.description,
      };

      // console.log(obj);
      // return;
      this.Srvc.addEvent(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            this.submitted = false;
            this.addEventForm.reset();
            this.usersArray = [];
            this.iconID = null;
            // this.ArrayImage = [];
            this.modalService.dismissAll();
            Swal.fire("Success", res.message, "success");
            this.getAllEvents();
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

  submitEventEdit() {
    this.submitted = true;
    if (this.addEventForm.valid) {
      let obj = {
        eventId:this.editEventID,
        eventType: this.iconID,
        invitedList: this.usersArray,
        eventName: this.addEventForm.value.eventName,
        eventFor: this.addEventForm.value.eventFor,
        maxLength: this.addEventForm.value.maxLength,
        startDate: this.addEventForm.value.startDate,
        endDate: this.addEventForm.value.endDate,
        startTime: this.addEventForm.value.startTime,
        endTime: this.addEventForm.value.endTime,
        address: this.addEventForm.value.address,
        description: this.addEventForm.value.description,
      };

      // console.log(obj);
      // return;
      this.Srvc.updateEvent(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            this.submitted = false;
            this.addEventForm.reset();
            this.usersArray = [];
            this.iconID = null;
            // this.ArrayImage = [];
            this.modalService.dismissAll();
            Swal.fire("Success", res.message, "success");
            this.getAllEvents();
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

  // Avoid Space on Empty input
  doSomething(e, ref) {
    if (!ref.length) {
      e.preventDefault();
    }
  }

  // Error Handling
  public errorHandling = (control: string, error: string) => {
    return this.addEventForm.controls[control].hasError(error);
  };

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

  // Add Poll
  submitPoll() {
    this.submitted = true;
    if (this.addPollForm.valid) {
      let obj = {
        eventId : this.eventID ,
        pollName: this.addPollForm.value.pollName,

      };

      console.log(obj);
      return;
      this.Srvc.addPoll(obj).subscribe(
        (res: any) => {
          if (res.statusCode == 401) {
            this.sessionTerminate();
          }
          if (res.statusCode == 200) {
            this.submitted = false;
            this.addPollForm.reset();
            Swal.fire("Success", res.message, "success");
            document.getElementById('close-modal').click();
            this.getAllEvents();
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
}
