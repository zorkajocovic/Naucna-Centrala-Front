import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { CamundaService } from 'src/app/services/camunda.service';
import { ArticleDTO } from 'src/app/models/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reviewers-review',
  templateUrl: './reviewers-review.component.html',
  styleUrls: ['./reviewers-review.component.css']
})
export class ReviewersReviewComponent implements OnInit {

  taskId: string;
  articleService: ArticleService;
  camundaService: CamundaService;
  article: ArticleDTO;
  formFieldsDto = [];
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
    var accepted, refused, bigChanges, smallChanges;

    if (approve["accept"] == "")
      accepted = false;
    else
      accepted = true;

    if (approve["acceptSmallChanges"] == "")
      smallChanges = false;
    else
      smallChanges = true;

    if (approve["acceptBigChanges"] == "")
      bigChanges = false;
    else
      bigChanges = true;

    if (approve["refuse"] == "")
      refused = false;
    else
      refused = true;

      let body = new FormData();
    body.append("accept", accepted);
    body.append("acceptSmallChanges", smallChanges);
    body.append("acceptBigChanges", bigChanges);
    body.append("refuse", refused);
    body.append("comment", approve["comment"]);

    let x = this.articleService.review(this.taskId, body).subscribe(
      res => {
        this.router.navigate(['reviewer']);
      },
      () => {
        console.log("Error occured");
      }
    );
  }
}
