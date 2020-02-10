import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sci-field',
  templateUrl: './sci-field.component.html',
  styleUrls: ['./sci-field.component.css']
})
export class SciFieldComponent implements OnInit {

  private formFieldsDto = null;
  private formFields = [];
  private processInstance = "";
  private enumValues = [];
  private tasks = [];
  private currentTaskId: string;
  private regService: RegistrationService;
  private camundaService: CamundaService;
  private noOfSciAreas: number;
  private o = new Array();

  constructor(private registrService: RegistrationService, private camService: CamundaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.regService = registrService;
    this.camundaService = camService;

    this.activatedRoute.params.subscribe(params => {
      this.processInstance = params["processInstance"];
      this.noOfSciAreas = params["noOfSciAreas"]
    });

    this.getTasks();
  }

  addSciField(sciField: any, form: NgForm) {
    for (var property in sciField) {
      this.o.push({ fieldId: property, fieldValue: sciField[property] });
    }
    this.noOfSciAreas--;

    if (this.noOfSciAreas == 0) {
      this.regService.addSciField(this.o, this.currentTaskId).subscribe(
        () => {
          alert("Dodali ste oblasti");
          this.router.navigate(['check-mail']);
        },
        error => {
          alert("nije uspelo dodavanje. Greska: " + error.message)
        });
    }
    else {
      this.camundaService.submitTask(this.currentTaskId, this.o).subscribe(
        () => {
          alert("Dodata oblast");
          this.getTasks();
        },
        error => {
          alert("Doslo je do greske pri zavrsetku taska!");
        });
    }
  }

  getTasks() {
    let x = this.camundaService.getTasks(this.processInstance);

    x.subscribe(
      res => {
        this.camundaService.getSciFieldsForRegister(res[0].taskId).subscribe(
          taskForm => {
            this.formFieldsDto = taskForm;
            this.formFields = taskForm.formField;
            this.processInstance = taskForm.processInstanceId;
            this.currentTaskId = taskForm.taskId;
            this.formFields.forEach((field) => {
              if (field.type.name == 'enum') {
                this.enumValues = Object.keys(field.type.values);
              }
            });
          }
        );
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  ngOnInit() {
  }

}
