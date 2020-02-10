import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  constructor(private httpClient: HttpClient) { }
  
  getAllMagazines() {
     return this.httpClient.get("http://localhost:8090/api/magazine/allMagazines") as Observable<any>;
   }

  startProcess(magazineId: any){
    return this.httpClient.get('http://localhost:8090/api/magazine/startArticleProcess/'.concat(magazineId)) as Observable<any>
  }

  paySubscribtion(taskId: string, instanceId: string, magazineId: number, payed){
    return this.httpClient.get('http://localhost:8090/api/magazine/tasks/submit/'.concat(taskId).
                                                                                concat("/").concat(instanceId).
                                                                                concat("/") + magazineId +
                                                                                "/" + payed) as Observable<any>
  }
  

}
