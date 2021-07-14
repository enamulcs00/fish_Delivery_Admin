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
import { NgForm, FormGroup, FormControl, FormArray } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/services/users.service";
import { Pipe, PipeTransform } from '@angular/core';



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
  @Pipe({name: 'convertFrom24To12Format'})

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
  filterName:string='All';
  searchitem: any;
  searchitemUser: any;
  btnStatus: any = 0;
  startTimeCheckValue: any;
  filterType: any = 0;
  totalEvents: any;
  addEventForm: FormGroup;
  addPollForm: FormGroup;
  searchValue: any;
  isEditPoll: boolean = false;
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
  submitted: boolean = false;
  tempArray: any=[];
  isAdd: boolean = false;
  isEdit: boolean = false;
  options: FormArray;
  editId: any;
  eventID: any;
  isModalEnable: boolean = false;
  editEventID: any;
  deleteID: any;
  pollsArray: any = [];
  pollID: any;
  deletePollID: any;
  guestList: any;
  startDateCheckValue: any;
  endDateCheckValue: any;
  endTimeCheckValue: any;
  startTimeConvert: any;
  endTimeConvert: any;
  isGuestInvited: boolean=false;
  showToggle: boolean=false;
  memberActionId: any;
  defaultSelection: any;
  noDataToggle: boolean=false;
  saveStateArray: any=[];

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
      options: new FormArray([]),
    });
  }


  transform(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
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

  pushFormArray() {
    this.options = this.addPollForm.get("options") as FormArray;
    this.options.push(this.AddOption());
  }

  AddOption(): FormGroup {
    return this.formBuilder.group({
      option: new FormControl("", [Validators.required]),
    });
  }

  removeOption(index) {
    const remove = this.addPollForm.get("options") as FormArray;
    remove.removeAt(index);
  }

  cancelForm() {
    this.modalService.dismissAll();
    this.usersArray = [];
    this.iconID = null;
    this.addEventForm.reset();
    // this.ArrayImage = [];
    this.submitted = false;
    this.startTimeCheckValue="";
    this.endTimeCheckValue="";
    this.startDateCheckValue="";
    this.endDateCheckValue="";
    this.selectIcon(this.defaultSelection);
  }

  // Calculate Duration(Difference b/w Start date & End date)
  getdiffDates(row) {
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
          this.noDataToggle = false;

          this.dataSource = new MatTableDataSource(res?.data?.eventData);
        } else {
          this.dataSource = null;
          this.noDataToggle = true;
          // this.toaster.error("No data found", "Oops", {
          //   timeOut: 2000,
          // });
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
    const array = [];
    this.eventTypeService.getEventType().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.defaultSelection = res?.data[0]?._id;
        const array = [];
        for (var x of res.data) {
          array.push({ id: x._id, image: x.eventImage });
        }
        this.ArrayImage = array;
      }
    });
  }

  // Get Today's Date
  getToday(): string {
    return new Date().toISOString().split("T")[0];
  }

  getMaxEndDate(){
    if (this.startDateCheckValue){
      return this.startDateCheckValue;
    }
    else {
      return new Date().toISOString().split("T")[0];
    }
  }

  // Convert time from 24 hr to 12 hr
  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }

  // convert Time from 12 hr to 24 hr
  convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }


  // Choose Event type icon
  selectIcon(id) {
    this.selectedIcon = true;
    // console.log("Icon selection Called",id);
    let index = this.ArrayImage.findIndex((x) => x.id == id);
    if (index != -1) {
      this.ArrayImage = this.ArrayImage.map((x) => {
        x["isSelected"] = false;
        return x;
      });
      this.ArrayImage[index]["isSelected"] = true;
    }
    this.iconID = id;
  }

  // Filter Type
  changeFilterType(filter) {
    this.filterType = filter;
    this.getAllEvents();
  }

  // Filter by Status(Public/Private)
  filterStatus(value,name) {
    this.filterName = name;
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


  userDeleteModal(userDelete, id) {
    this.deleteID = id;
    this.modalService.open(userDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }

  pollDeleteModal(pollDelete, id) {
    this.deletePollID = id;
    this.modalService.open(pollDelete, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "sm",
    });
  }
  Adddetails(Adddetail) {
    this.tempArray = [];
    for (var user of this.usersArray) {
      this.tempArray.push(user);
    }
    this.getEventType();
    this.isAdd = true;
    this.isEdit = false;
    // this.getEventType();
    this.selectIcon(this.defaultSelection);
    this.modalService.open(Adddetail, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
  eventsedit(Adddetail, row) {
    this.isAdd = false;
    this.isEdit = true;
    this.addEventForm.reset();
    this.usersArray = [];
    this.iconID = null;
    // this.ArrayImage = [];
    this.submitted = false;
    // this.getEventType();
    this.isGuestInvited = row?.isGuestInvites
    this.addEventForm.controls["eventName"].setValue(row?.eventName);
    this.addEventForm.controls["eventFor"].setValue(row?.eventFor);
    this.addEventForm.controls["maxLength"].setValue(row?.maxLength);
    this.addEventForm.controls["startDate"].setValue(
      moment(row?.startDate).format("YYYY-MM-DD")
    );
    this.addEventForm.controls["endDate"].setValue(
      moment(row?.endDate).format("YYYY-MM-DD")
    );
    this.addEventForm.controls["startTime"].setValue(this.convertTime12to24(row?.startTime));
    this.addEventForm.controls["endTime"].setValue(this.convertTime12to24(row?.endTime));
    this.addEventForm.controls["address"].setValue(row?.address);
    this.addEventForm.controls["description"].setValue(row?.description);
    if (row?.eventFor==1){
      this.showToggle = false;
    }
    if (row?.eventFor==2){
      this.showToggle = true;
    }

    // Push the User ID in User Array
    for (var user of row.invitedList) {
      this.usersArray.push(user._id);
    }

    this.editEventID = row?._id;

    this.tempArray = [];
    for (var user of this.usersArray) {
      this.tempArray.push(user);
    }

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
  carModal(car, id) {
    const filteredData = this.eventData.find(
      (element: any) => element._id === id
    );
    this.guestList = filteredData.acceptedList;
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
    this.memberActionId = id;
    this.modalService.open(car2, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
    });
  }
  pollsmodal(polls,id) {
    const filteredData = this.eventData.find(
      (element: any) => element._id === id
    );
    this.pollsData = filteredData.pollId;
    this.eventID = id;
    // console.log(this.pollsData)
    this.modalService.open(polls, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }

  // Cancel Poll
  cancelPoll() {
    this.addPollForm.reset();
    this.pollsArray = [];
  }

  // Edit Poll
  editpollmodal(editpoll, poll) {
    this.isEditPoll = true;
    this.pollID = poll?._id;
    const remove = this.addPollForm.get("options") as FormArray;
    remove.clear();
    this.addPollForm.controls["pollName"].setValue(poll?.pollName);
    this.pollsArray = <FormArray>this.addPollForm.controls.options;

    for (let x of poll?.options) {
      this.pollsArray.push(
        this.formBuilder.group({
          option: x.option,
        })
      );
    }

    this.modalService.open(editpoll, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }

  addpollmodal(editpoll) {
    const remove = this.addPollForm.get("options") as FormArray;
    remove.clear();
    this.modalService.open(editpoll, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }
  invitemodal(invite) {
    this.pageindecUser=1;
    this.getUsers();
    this.modalService.open(invite, {
      backdropClass: "light-blue-backdrop",
      centered: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }

  // Get Users listing
  getUsers() {
    const data = {
      // limit: this.pageUser,
      // page: this.pageindecUser == null ? 1 : this.pageindecUser,
      search: this.searchitemUser == null ? "" : this.searchitemUser,
      type:1
    };
    this.usersService.getUsersandUsers(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        this.usersData = res?.data?.userList;
        // this.totalUsers = res?.data?.count;
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
      this.tempArray.push(id);
    } else {
      this.tempArray.splice(this.tempArray.indexOf(id), 1);
    }
  }

  saveArray(){
    this.usersArray = this.tempArray;
    this.saveStateArray = this.usersArray;
    this.tempArray = [].concat(this.saveStateArray);
  }

  removeArray(){
    this.usersArray = this.saveStateArray;
    this.tempArray=[].concat(this.usersArray);
  }

  changeGuestInvites(event) {
    this.isGuestInvited = event.checked;
  }

  showInvites(e){
    if (e.target.value=="2"){
      this.showToggle = true;
    }
    else {
      this.showToggle = false;
    }

  }

  submitEvent() {
    this.submitted = true;
    if (this.addEventForm.valid) {
      this.startTimeConvert = this.tConvert(this.addEventForm.value.startTime)
      this.endTimeConvert = this.tConvert(this.addEventForm.value.endTime)
      let obj = {
        eventType: this.iconID,
        invitedList: this.usersArray,
        eventName: this.addEventForm.value.eventName,
        eventFor: this.addEventForm.value.eventFor,
        maxLength: this.addEventForm.value.maxLength,
        startDate: this.addEventForm.value.startDate,
        endDate: this.addEventForm.value.endDate,
        startTime: this.startTimeConvert,
        endTime: this.endTimeConvert,
        address: this.addEventForm.value.address,
        description: this.addEventForm.value.description,
        isGuestInvites : this.isGuestInvited
      };
      if (obj.eventFor==1){
        obj.isGuestInvites=true;
      }
      if (!obj.eventType){
        obj.eventType=this.defaultSelection;
      }

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
            this.startTimeCheckValue="";
            this.endTimeCheckValue="";
            this.startTimeConvert="";
            this.endTimeConvert="";
            this.startDateCheckValue="";
            this.endDateCheckValue="";
            this.showToggle=false;
            this.getAllEvents();
            this.selectIcon(this.defaultSelection);
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
        eventId: this.editEventID,
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
            this.startTimeCheckValue="";
            this.endTimeCheckValue="";
            this.startDateCheckValue="";
            this.endDateCheckValue="";
            this.modalService.dismissAll();
            this.showToggle=false;
            Swal.fire("Success", res.message, "success");
            this.getAllEvents();
            this.selectIcon(this.defaultSelection);
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
        eventId: this.eventID,
        pollName: this.addPollForm.value.pollName,
        options: this.addPollForm.controls["options"].value,
      };
      if (obj.options.length) {
        // console.log(obj);
        // return;
        this.Srvc.addPoll(obj).subscribe(
          (res: any) => {
            if (res.statusCode == 401) {
              this.sessionTerminate();
            }
            if (res.statusCode == 200) {
              this.isEditPoll = false;
              this.submitted = false;
              this.addPollForm.reset();
              this.getAllEvents();
              Swal.fire("Success", res.message, "success");
              document.getElementById("close-modal").click();
              this.modalService.dismissAll();
              // setTimeout(() => {
              //   document.getElementById(this.eventID).click();
              // },150)

            } else {
              Swal.fire("Oops", res.message, "error");
            }
          },
          (error) => {
            Swal.fire("Oops", "Something went wrong", "error");
          }
        );
      } else {
        this.toaster.error("Atleast 1 option is required");
      }
    } else {
      this.toaster.error("Please fill all the required fields");
    }
  }

  // Edit Poll
  editPoll() {
    this.submitted = true;
    if (this.addPollForm.valid) {
      let obj = {
        eventId: this.eventID,
        pollId: this.pollID,
        pollName: this.addPollForm.value.pollName,
        options: this.addPollForm.controls["options"].value,
      };
      if (obj.options.length) {
        // console.log(obj);
        // return;
        this.Srvc.updatePoll(obj).subscribe(
          (res: any) => {
            if (res.statusCode == 401) {
              this.sessionTerminate();
            }
            if (res.statusCode == 200) {
              this.isEditPoll = false;
              this.submitted = false;
              this.addPollForm.reset();
              Swal.fire("Success", res.message, "success");
              document.getElementById("close-modal").click();
              this.modalService.dismissAll();
              this.getAllEvents();
              // setTimeout(() => {
              //   document.getElementById(this.eventID).click();
              // },100)
            } else {
              Swal.fire("Oops", res.message, "error");
            }
          },
          (error) => {
            Swal.fire("Oops", "Something went wrong", "error");
          }
        );
      } else {
        this.toaster.error("Atleast 1 option is required");
      }
    } else {
      this.toaster.error("Please fill all the required fields");
    }
  }

  deleteEvent() {
    const data = {
      eventId: this.deleteID,
      isDeleted: true,
    };

    this.Srvc.updateEvent(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Deleted", "Event deleted successfully", "success");
        this.modalService.dismissAll();
        this.getAllEvents();
      } else {
        Swal.fire("Oops", "Failed to delete Event", "error");
      }
    });
  }

  deletePoll() {
    const data = {
      eventId: this.eventID,
      pollId: this.deletePollID,
      isDeleted: true,
    };

    this.Srvc.updatePoll(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Deleted", "Poll deleted successfully", "success");
        this.modalService.dismissAll();
        this.getAllEvents();
        setTimeout(() => {
          document.getElementById(this.eventID).click();
        },100)
      } else {
        Swal.fire("Oops", "Failed to delete Poll", "error");
      }
    });
  }

  // Date / Time Checks
  startDateCheck(e) {
    this.startDateCheckValue = e.target.value;

    if (this.endDateCheckValue){
      if (this.startDateCheckValue>this.endDateCheckValue){
        this.startDateCheckValue="";
        this.endDateCheckValue="";
        this.addEventForm.controls["startDate"].reset();
        this.addEventForm.controls["endDate"].reset();
        this.toaster.error("Please check start date & end date again!");
      }
    }
  }

  endDateCheck(e) {
    this.endDateCheckValue = e.target.value;
    if (
      this.startDateCheckValue &&
      this.startDateCheckValue === this.endDateCheckValue
    ) {
      if (this.startTimeCheckValue && this.endTimeCheckValue) {
        if (this.startTimeCheckValue >= this.endDateCheckValue) {
          // console.log("EndDate Check");
          this.addEventForm.controls["endTime"].reset();
          this.endTimeCheckValue = "";
          this.addEventForm.controls["startTime"].reset();
          this.startTimeCheckValue = "";
          this.toaster.error("Please check start time & end time again!");
        }
      }
    }
  }

  startTimeCheck(e) {
    this.startTimeCheckValue = e.target.value;
    if (this.startDateCheckValue == this.endDateCheckValue) {
      if (this.startTimeCheckValue && this.endTimeCheckValue) {
        if (this.startTimeCheckValue >= this.endTimeCheckValue) {
          this.addEventForm.controls["endTime"].reset();
          this.endTimeCheckValue = "";
          this.addEventForm.controls["startTime"].reset();
          this.startTimeCheckValue = "";
          this.toaster.error("Please check start time & end time again!");
        }
      }
    }
  }

  endTimeCheck(e) {
    this.endTimeCheckValue = e.target.value;
    if (this.startDateCheckValue == this.endDateCheckValue) {
      if (this.startTimeCheckValue && this.endTimeCheckValue) {
        if (this.startTimeCheckValue >= this.endTimeCheckValue) {
          this.addEventForm.controls["endTime"].reset();
          this.endTimeCheckValue = "";
          this.addEventForm.controls["startTime"].reset();
          this.startTimeCheckValue = "";
          this.toaster.error("Please check Start time & end time again!");
        }
      }
    }
  }

  // Remove a Member
  removeMember(id){
    const data = {
      groupId: this.memberActionId,
      userId: id,
      isJoin:false
    };

    this.Srvc.memberAction(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Removed", "Event member successfully removed", "success");
        this.modalService.dismissAll();
        this.getAllEvents();
      } else {
        Swal.fire("Oops", res.message, "error");
      }
    });
  }

  // Accept a Member
  acceptMember(id){
    const data = {
      groupId: this.memberActionId,
      userId: id,
      isJoin:true
    };

    this.Srvc.memberAction(data).subscribe((res: any) => {
      if (res.statusCode == 401) {
        this.sessionTerminate();
      }
      if (res.statusCode == 200) {
        Swal.fire("Success", "Event member successfully accepted", "success");
        this.modalService.dismissAll();
        this.getAllEvents();

      } else {
        Swal.fire("Oops", res.message, "error");
      }
    });
  }
}
