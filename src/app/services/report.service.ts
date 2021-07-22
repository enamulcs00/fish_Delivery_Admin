import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseURL = "http://15.207.74.128:9041/api/v1/";

  constructor(private http: HttpClient) {}

  // Get All
  getAll(data) {
    return this.http.post<any>(`${this.baseURL}Admin/getAllReports`, data);
  }

  // Delete
  deleteReport(body){
    return this.http.post(this.baseURL+"Admin/deleteReports",body);
  }
}
