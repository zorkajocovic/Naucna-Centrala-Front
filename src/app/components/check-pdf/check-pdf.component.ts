import { Component, OnInit } from '@angular/core';
import { CamundaService } from 'src/app/services/camunda.service';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleDTO } from 'src/app/models/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-pdf',
  templateUrl: './check-pdf.component.html',
  styleUrls: ['./check-pdf.component.css']
})
export class CheckPdfComponent implements OnInit {

  taskId: string;
  articleService: ArticleService;
  camundaService: CamundaService;
  article: ArticleDTO;
  formFieldsDto = null;
  formFields = [];
  processInstance = "";
  currentTaskId: string;
  authorEmail: string;
  seconds: string = "0";
  minutes: string = "0";
  hours: string = "0";
  days: string = "0";
  months: string = "0";

  constructor(private activatedRoute: ActivatedRoute, private artService: ArticleService, private camService: CamundaService, private router: Router) {
    this.articleService = artService;
    this.camundaService = camService;

    this.activatedRoute.params.subscribe(params => {
      this.taskId = params["taskId"];
    });
  }

  ngOnInit() {
    this.getNewArticleDetails();
  }

  getNewArticleDetails() {

    let x = this.articleService.getArticleDetails(this.taskId).subscribe(
      res => {
        this.article = res;
        this.authorEmail = res.authorEmail;
        let x = this.camundaService.getTask(this.taskId).subscribe(
          res => {
            this.formFieldsDto = res;
            this.formFields = res.formField;
            this.processInstance = res.processInstanceId;
            this.currentTaskId = res.taskId;
          },
          error => {
            console.log("Error occured " + error.message);
          }
        );
      },
      error => {
        console.log("Error occured " + error.message);
      }
    );
  }

  approve(approve, form: NgForm) {

    var approved;

    if (approve["goodFormat"] == "") {
      approved = false;
      alert("Autoru se zadaje rok za ispravku PDF-a ...");
    }
    else {
      approved = true;
      alert("Rad se salje na recenziranje ...");
    }
     
    let body = new FormData();
    body.append("sec", this.seconds);
    body.append("min", this.minutes);
    body.append("hours", this.hours);
    body.append("days", this.days);
    body.append("months", this.months);
    body.append("comment", approve["comment"]);

    let x = this.articleService.decidePdf(this.taskId, this.authorEmail, approved, body).subscribe(
      res => {
        this.router.navigate(['my-tasks']);
      },
      () => {
        console.log("Error occured");
      }
    );
  }
}
