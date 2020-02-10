import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { CamundaService } from 'src/app/services/camunda.service';
import { ArticleDTO } from 'src/app/models/Article';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-correct-pdf',
  templateUrl: './correct-pdf.component.html',
  styleUrls: ['./correct-pdf.component.css']
})
export class CorrectPdfComponent implements OnInit {

  taskId: string;
  articleService: ArticleService;
  camundaService: CamundaService;
  article: ArticleDTO;
  formFieldsDto = null;
  formFields = [];
  processInstance = "";
  currentTaskId: string;
  selectedPdf: File;

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
  
  saveArticle(article: ArticleDTO, form: NgForm){
    
    let body = new FormData();
    body.append('pdf', this.selectedPdf);
    body.append('fileName', this.article.title);
    body.append('taskId', this.taskId);

    const articleJson = JSON.stringify(article);
    body.append("article", articleJson);

    let x = this.articleService.reuploadPdf(body).subscribe(
      res => {
        this.router.navigate(['my-tasks']);
      },
      error => {
        console.log("Error occured " + error.message);
      }
    );
  }

  onSelectPdf(event: any) {
    this.selectedPdf = event.target.files[0];
  }
}
