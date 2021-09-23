import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.clientURL}Admin/getUser`, data);
  }

  // Get by ID
  getUser(body){
    return this.http.post(this.clientURL+"Admin/getUserById",body);
  }

  // Update
  updateUser(body){
    return this.http.put(this.clientURL+"Admin/updateUser",body);
  }

  // Delete
  deleteUser(id){
    return this.http.delete(this.clientURL+"admin/user/"+id);
  }

  // Change Active/Inactive Status
  changeStatus(id,body){
    return this.http.put(this.clientURL+"admin/user/"+id,body);
  }

  // Get Country
  getCountry() {
    return this.http.get('assets/country/data.json');
  }

  // GET Groups & Users
  getUsersandUsers(data){
    return this.http.post<any>(`${this.clientURL}Admin/contactSync`, data);
  }

  // Download CSV
  downloadCSV(){
    return this.http.get<any>(`${this.clientURL}Admin/getUerCsv`);
  }
}
