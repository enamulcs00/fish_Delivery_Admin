import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseURL = "http://15.207.74.128:9041/api/v1/";

  constructor(private http: HttpClient) {}

  // Send Notification
  sendNotification(body){
    return this.http.post(this.baseURL+"admin/sendNotification",body);
  }

}
