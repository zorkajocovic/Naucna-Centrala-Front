import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamundaService {

  constructor(private httpClient: HttpClient, private router: Router) { }

startRegProcess(){
  return this.httpClient.get('http://localhost:8090/camunda/startRegProcess') as Observable<any>
}

  startLoginProcess(){
    return this.httpClient.get('http://localhost:8090/camunda/startLoginProcess') as Observable<any>
  }

  getTasksForUser(){
    return this.httpClient.get('http://localhost:8090/camunda/getTasksForUser') as Observable<any>
  }

  getSciFieldsForRegister(taskId: string){
    return this.httpClient.get('http://localhost:8090/api/sciAreas/getSciFieldsForRegister/'.concat(taskId)) as Observable<any>
  }

  getTasks(processInstanceId : string){
    return this.httpClient.get('http://localhost:8090/camunda/get/tasks/'.concat(processInstanceId)) as Observable<any>
  }

  getTask(taskId : string){
    return this.httpClient.get('http://localhost:8090/camunda/get/'.concat(taskId)) as Observable<any>
  }

  claimTask(taskId){
    return this.httpClient.post('http://localhost:8090/camunda/tasks/claim/'.concat(taskId), null) as Observable<any>
  }

  submitTask(taskId: string, sciField: any){
    return this.httpClient.post('http://localhost:8090/api/user/tasks/submit/'.concat(taskId), sciField) as Observable<any>
  }
  
}
