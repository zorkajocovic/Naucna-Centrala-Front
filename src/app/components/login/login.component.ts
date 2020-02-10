import { Component, OnInit } from '@angular/core';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   formFieldsDto = null;
   formFields = [];
   processInstance = "";
   enumValues = [];
   tasks = [];
   currentTaskId: string;
   camundaService: CamundaService;
   noOfSciAreas: number = 0;
   logService: LoginService;

  constructor(private service: LoginService, private camService: CamundaService, private router: Router) {
    this.logService = service;
    this.camundaService = camService;

    let x = this.camundaService.startLoginProcess().subscribe(
      res => {
        this.formFieldsDto = res;
        this.formFields = res.formField;
        this.processInstance = res.processInstanceId;
        this.currentTaskId = res.taskId;
      },
      () => {
        console.log("Error occured");
      }
    );
  }

  ngOnInit() {
  }

  logIn(user: any, form: NgForm) {
    let o = new Array();

    for (var property in user) {
      o.push({
        fieldId: property, fieldValue: user[property]
      });
    }
    this.logService.getTheToken(o, this.currentTaskId);

    form.reset();
  }

}
