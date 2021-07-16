import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL = "http://15.207.74.128:9041/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.baseURL}Admin/getSubAdmin`, data);
  }

  // Get by ID
  getAdmin(body){
    return this.http.post(this.baseURL+"Admin/getSubAdminById",body);
  }

  // Update Sub Admin
  updateAdmin(body){
    return this.http.post(this.baseURL+"Admin/updateSubAdmin",body);
  }

  // Add Sub Admin
  addAdmin(body) {
    return this.http.post<any>(`${this.baseURL}Admin/addSubAdmin`, body);
  }

  // Upload Photo
  uploadFile(data) {
    return this.http.post(`${this.baseURL}User/uploadFile`, data);
  }

  // Get Country
  getCountry() {
    return this.http.get(`https://restcountries.eu/rest/v2/all`);
  }

}
