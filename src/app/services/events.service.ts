import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.clientURL}Admin/getEvent`, data);
  }

  // Get by ID
  getEvent(body){
    return this.http.post(this.clientURL+"Admin/getEventById",body);
  }

  // Update
  updateEvent(body){
    return this.http.put(this.clientURL+"Admin/updateEvent",body);
  }

  // Add Event
  addEvent(body) {
    return this.http.post<any>(`${this.clientURL}Admin/createEvent`, body);
  }

  // Accept/Reject a member
  memberAction(body) {
    return this.http.post<any>(`${this.clientURL}Admin/joinEventByEventId`, body);
  }



  //////////////////////////Polls/////////////////////////

  // Add Poll
  addPoll(body) {
    return this.http.post<any>(`${this.clientURL}Admin/addPoll`, body);
  }

  // Update Poll
  updatePoll(body){
    return this.http.put<any>(`${this.clientURL}Admin/updatePoll`, body);
  }

  // Delete Poll
  deletePoll(body){
    return this.http.post<any>(`${this.clientURL}Admin/deletePoll`, body);
  }

  // Download CSV
  downloadCSV(body){
    return this.http.post<any>(`${this.clientURL}Admin/getEventsCsv`, body);
  }

}
