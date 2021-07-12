import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseURL = "http://15.207.74.128:9041/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.baseURL}Admin/getEvent`, data);
  }

  // Get by ID
  getEvent(body){
    return this.http.post(this.baseURL+"Admin/getEventById",body);
  }

  // Update
  updateEvent(body){
    return this.http.put(this.baseURL+"Admin/updateEvent",body);
  }

  // Add Event
  addEvent(body) {
    return this.http.post<any>(`${this.baseURL}Admin/createEvent`, body);
  }

  // Accept/Reject a member
  memberAction(body) {
    return this.http.post<any>(`${this.baseURL}joinEventByEventId`, body);
  }



  //////////////////////////Polls/////////////////////////

  // Add Poll
  addPoll(body) {
    return this.http.post<any>(`${this.baseURL}Admin/addPoll`, body);
  }

  // Update Poll
  updatePoll(body){
    return this.http.put<any>(`${this.baseURL}Admin/updatePoll`, body);
  }

  // Delete Poll
  deletePoll(body){
    return this.http.post<any>(`${this.baseURL}Admin/deletePoll`, body);
  }

}
