import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.clientURL}Admin/getGroup`, data);
  }

  // Get by ID
  getGroup(body){
    return this.http.post(this.clientURL+"Admin/getGroupById",body);
  }

  // Update
  updateGroup(body){
    return this.http.put(this.clientURL+"Admin/updateGroup",body);
  }

  // Add Event
  addGroup(body) {
    return this.http.post<any>(`${this.clientURL}Admin/createGroup`, body);
  }

  // Upload Photo
  uploadFile(data) {
    return this.http.post(`${this.clientURL}User/uploadFile`, data);
  }

  // Remove Member
  removeMember(body){
    return this.http.post(this.clientURL+"Admin/removeFromGroup",body);
  }
}
