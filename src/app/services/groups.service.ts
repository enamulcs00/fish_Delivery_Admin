import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseURL = "http://15.207.74.128:9041/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.baseURL}Admin/getGroup`, data);
  }

  // Get by ID
  getGroup(body){
    return this.http.post(this.baseURL+"Admin/getGroupById",body);
  }

  // Update
  updateGroup(body){
    return this.http.put(this.baseURL+"Admin/updateGroup",body);
  }

  // Add Event
  addGroup(body) {
    return this.http.post<any>(`${this.baseURL}Admin/createGroup`, body);
  }

  // Upload Photo
  uploadFile(data) {
    return this.http.post(`${this.baseURL}User/uploadFile`, data);
  }
}
