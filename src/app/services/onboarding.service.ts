import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, of, pipe, Subject } from "rxjs";
import { catchError, map, tap } from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  public search_value = new BehaviorSubject<any>([]);
  public $searchvalue = this.search_value.asObservable();

  baseURL = "http://15.207.74.128:9045/api/v1/";
  clientURL = "https://api.thelassoapp.com/api/v1/";

  constructor(private http: HttpClient) {}

  // Login
  login(data) {
    return this.http.post<any>(this.clientURL+"Admin/login",data);
  }

  // Forgot Password
  forgotPassword(data) {
    return this.http.post(`${this.clientURL}Admin/sendNewPasswordInEmail`, data);
  }

  // Get Admin Profile
  getProfile() {
    return this.http.get(`${this.clientURL}Admin/getProfile`);
  }

  // Upload Photo
  uploadFile(data) {
    return this.http.post(`${this.clientURL}User/uploadFile`, data);
  }

  // Update Admin
  updateAdmin(data) {
    return this.http.put(`${this.clientURL}Admin/updateProfile`, data);
  }

  // Change Password
  changePassword(data) {
    return this.http.post(`${this.clientURL}Admin/changePassword`, data);
  }

  // Token Check
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // Get the Token from Storage
  getToken() {
    return sessionStorage.getItem("token");
  }

  // Service to update Elements on Change
  searchdata() {
    this.search_value.next("12");
  }

  // Get Country
  getCountry() {
    return this.http.get('assets/country/data.json');
  }
}
