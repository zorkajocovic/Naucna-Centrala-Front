import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  registerUser(user, taskId) {
    return this.httpClient.post("http://localhost:8090/camunda/post/".concat(taskId), user) as Observable<any>;
  }

  setAsReviewer(user, taskId) {
    return this.httpClient.post("http://localhost:8090/camunda/setAsReviewer/".concat(taskId), user) as Observable<any>;
  }

  addSciField(sciField, taskId) {
    return this.httpClient.post("http://localhost:8090/api/user/addSciFieldForUser/".concat(taskId), sciField) as Observable<any>;
  }
}
