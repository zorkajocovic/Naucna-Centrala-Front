import { Component, OnInit } from '@angular/core';
import { CamundaService } from 'src/app/services/camunda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reviewers-choose',
  templateUrl: './reviewers-choose.component.html',
  styleUrls: ['./reviewers-choose.component.css']
})
export class ReviewersChooseComponent implements OnInit {

  camundaService: CamundaService;
  taskId: string;
  formFieldsDto = null;
  formFields = [];
  enumValues = [];
  processInstance = "";
  currentTaskId: string;
  articleService: ArticleService;
  noReviewers: number = 0;
  o = new Array();
  usernames: string = "";
  seconds: string = "0";
  minutes: string = "0";
  hours: string = "0";
  days: string = "0";
  months: string = "0";

  constructor(private camService: CamundaService, private art: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.camundaService = camService;
    this.articleService = art;

    this.activatedRoute.params.subscribe(params => {
      this.currentTaskId = params["taskId"];
      this.noReviewers = params["no-reviewers"];
    });

    this.getReviewers();
  }

  add(reviewer, form: NgForm) {
    debugger
    for (var property in reviewer) {
      this.o.push({
        fieldId: property, fieldValue: reviewer[property]
      });
      this.usernames += reviewer[property];
      if((this.noReviewers - 1) > 0)
      this.usernames += ",";
    }
  
    this.noReviewers--;
    if (this.noReviewers == 0) {
      let body = new FormData();
      body.append("sec", this.seconds);
      body.append("min", this.minutes);
      body.append("hours", this.hours);
      body.append("days", this.days);
      body.append("months", this.months);
      body.append("ids", this.usernames);
  
      this.articleService.addReviewers(this.currentTaskId, body).subscribe(
        () => {
          debugger
          alert("Dodali ste recenzente");
          if (localStorage.getItem("role") == "MAIN_EDITOR")
            this.router.navigate(['chief-editor/' + this.noReviewers]);
          if (localStorage.getItem("role") == "EDITOR")
            this.router.navigate(['editor/' + this.noReviewers]);
        },
        error => {
          alert("nije uspelo dodavanje. Greska: " + error.message)
        });
    }
    else {
      this.camundaService.submitTask(this.currentTaskId, this.o).subscribe(
        () => {
          alert("Dodat recenzent");
          this.camundaService.getTasksForUser().subscribe(
            res => {
              debugger
              this.currentTaskId = res[0].taskId;
              this.getReviewers();
              this.formFields.forEach((field) => {
                if (field.type.name == 'enum') {
                  this.enumValues = Object.keys(field.type.values);
                }
              });
        },
        error => {
          alert("Doslo je do greske pri zavrsetku taska!");
        });
    });
  }
  }

  getReviewers() {

    let x = this.articleService.getReviewers(this.currentTaskId).subscribe(
      res => {
        this.formFieldsDto = res;
        this.formFields = res.formField;
        this.processInstance = res.processInstanceId;
        this.currentTaskId = res.taskId;
        this.formFields.forEach((field) => {
          if (field.type.name == 'enum') {
            this.enumValues = Object.keys(field.type.values);
          }
        });
      },
      error => {
        console.log("Error occured " + error.message);
      }
    );
  }

  ngOnInit() {
  }
}
