import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll() {
    return this.http.get<any>(`${this.clientURL}Admin/getCms`);
  }

  //Update
  update(data) {
    return this.http.put<any>(`${this.clientURL}Admin/addCms`, data);
  }
}
