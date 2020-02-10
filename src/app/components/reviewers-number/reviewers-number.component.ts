import { Component, OnInit } from '@angular/core';
import { CamundaService } from 'src/app/services/camunda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-reviewers-number',
  templateUrl: './reviewers-number.component.html',
  styleUrls: ['./reviewers-number.component.css']
})
export class ReviewersNumberComponent implements OnInit {

  noReviewers: number;
  camundaService: CamundaService;
  taskId: string;
  formFieldsDto = null;
  formFields = [];
  processInstance = "";
  currentTaskId: string;
  articleService: ArticleService;

  constructor(private camService: CamundaService, private art: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.camundaService = camService;
    this.articleService = this.art;

    this.activatedRoute.params.subscribe(params => {
      this.taskId = params["taskId"];
    });
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
  }

  add(number: number, form: NgForm) {
    this.noReviewers = number["noReviewers"];
    let x = this.articleService.insertNumberReviewers(this.taskId, this.noReviewers).subscribe(
      res => {
        if (localStorage.getItem("role") == "MAIN_EDITOR")
          this.router.navigate(['chief-editor/' + this.noReviewers]);
        if (localStorage.getItem("role") == "EDITOR")
          this.router.navigate(['editor/' + this.noReviewers]);

      },
      () => {
        console.log("Error occured");
      }
    );
  }

  ngOnInit() {
  }

}
