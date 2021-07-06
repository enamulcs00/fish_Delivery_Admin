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

  // Add
  addEvent(body) {
    return this.http.post<any>(`${this.baseURL}Admin/createEvent`, body);
  }

}
