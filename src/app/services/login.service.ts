import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private messageSource = new BehaviorSubject<boolean>(false);
  currentLoginState = this.messageSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }
  
  changeLoginState(state: boolean){
    this.messageSource.next(state);
  }

 loginUser(user, taskId) {
    return this.httpClient.post("http://localhost:8090/api/user/login/".concat(taskId), user) as Observable<any>;
  }

  getActiveUser(){
    return this.httpClient.get("http://localhost:8090/api/user/getCurrentUser") as Observable<any>;
  }

  getTheToken(user, currentTaskId){

    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    const body = {
        username: user[0].fieldValue,
        password: user[1].fieldValue
    };

    if(!localStorage.jwt)
    {
       let x = this.httpClient.post('http://localhost:8090/api/user/login/'.concat(currentTaskId), JSON.stringify(body), {"headers": headers}) as Observable<any>

    x.subscribe(
        res => {
          console.log(res.access_token);
          let jwt = res.token;
          let jwtData = jwt.split('.')[1];
          let decodedJwtJsonData = window.atob(jwtData);
          let decodedJwtData = JSON.parse(decodedJwtJsonData);

          let role = decodedJwtData.roles[0].authority;

          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role);

          this.changeLoginState(true);
          this.router.navigate(['home']);
        },
        err => {
          alert("Pogresna sifra ili username!");

        }
      );
    }
  }
}
