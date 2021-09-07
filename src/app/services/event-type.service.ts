import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get Admin Profile
  getEventType() {
    return this.http.get(`${this.clientURL}Admin/getEventType`);
  }

  // Upload Photo
  uploadFile(data) {
    return this.http.post(`${this.clientURL}User/uploadFile`, data);
  }

  // Upload Photo
  addImage(data) {
    return this.http.post(`${this.clientURL}Admin/addEventType`, data);
  }

  // Delete
  delete(data) {
    return this.http.post(`${this.clientURL}Admin/deleteEventType`, data);
  }
}
