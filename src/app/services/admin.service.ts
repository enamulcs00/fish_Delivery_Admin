import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.clientURL}Admin/getSubAdmin`, data);
  }

  // Get by ID
  getAdmin(body){
    return this.http.post(this.clientURL+"Admin/getSubAdminById",body);
  }

  // Update Sub Admin
  updateAdmin(body){
    return this.http.post(this.clientURL+"Admin/updateSubAdmin",body);
  }

  // Add Sub Admin
  addAdmin(body) {
    return this.http.post<any>(`${this.clientURL}Admin/addSubAdmin`, body);
  }

  // Upload Photo
  uploadFile(data) {
    return this.http.post(`${this.clientURL}User/uploadFile`, data);
  }

  // Get Country
  getCountry() {
    return this.http.get(`https://restcountries.eu/rest/v2/all`);
  }

}
