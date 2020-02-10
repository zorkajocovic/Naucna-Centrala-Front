import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleDTO } from 'src/app/models/Article';
import { CamundaService } from 'src/app/services/camunda.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review-article',
  templateUrl: './review-article.component.html',
  styleUrls: ['./review-article.component.css']
})
export class ReviewArticleComponent implements OnInit {

  taskId: string;
  articleService: ArticleService;
  camundaService: CamundaService;
  article: ArticleDTO;
  formFieldsDto = null;
  formFields = [];
  processInstance = "";
  currentTaskId: string;
  authorEmail: string;

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
    if (approve["isSciAreaGood"] == "") 
      approved = false;
    else 
      approved = true;
    
    let x = this.articleService.decide(this.taskId, this.authorEmail, approved).subscribe(
      res => {
        this.router.navigate(['my-tasks']);
      },
      () => {
        console.log("Error occured");
      }
    );
  }
}

