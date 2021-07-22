import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = "http://15.207.74.128:9041/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.baseURL}Admin/getUser`, data);
  }

  // Get by ID
  getUser(body){
    return this.http.post(this.baseURL+"Admin/getUserById",body);
  }

  // Update
  updateUser(body){
    return this.http.put(this.baseURL+"Admin/updateUser",body);
  }

  // Delete
  deleteUser(id){
    return this.http.delete(this.baseURL+"admin/user/"+id);
  }

  // Change Active/Inactive Status
  changeStatus(id,body){
    return this.http.put(this.baseURL+"admin/user/"+id,body);
  }

  // Get Country
  getCountry() {
    return this.http.get(`https://restcountries.eu/rest/v2/all`);
  }

  // GET Groups & Users
  getUsersandUsers(data){
    return this.http.post<any>(`${this.baseURL}Admin/contactSync`, data);
  }

  // Download CSV
  downloadCSV(){
    return this.http.get<any>(`${this.baseURL}Admin/getUerCsv`);
  }
}
