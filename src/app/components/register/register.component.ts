import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/Register';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { CamundaService } from 'src/app/services/camunda.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roles: any = ["User", "Editor", "Chief Editor", "Reviewer", "Author"];
  private formFieldsDto = null;
  private formFields = [];
  private choosen_category = -1;
  private processInstance = "";
  private enumValues = [];
  private tasks = [];
  private currentTaskId: string;
  private regService: RegistrationService;
  private camundaService: CamundaService;
  private noOfSciAreas: number = 0;

  constructor(private service: RegistrationService, private camService: CamundaService, private router: Router) {
    this.regService = service;
    this.camundaService = camService;

    let x = this.camundaService.startRegProcess().subscribe(
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

  onSubmit(user: any, form: NgForm) {
    let o = new Array();

    for (var property in user) {
      o.push({
         fieldId: property, fieldValue: user[property]
      });
      if(property == "noSciFields")
        this.noOfSciAreas = user[property];
    }

    this.regService.registerUser(o, this.currentTaskId).subscribe(
      () => {
        alert("Unesite naucne oblasti za koje ste zainteresovani.");
        this.router.navigate(['addScientifiField/'.concat(this.processInstance).concat("/") + this.noOfSciAreas]);
      },
      error => {
        alert("nije uspela registracija. Greska: " + error)
      });

    form.reset();
  }

}
