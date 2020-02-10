import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaService } from 'src/app/services/camunda.service';
import { NgForm } from '@angular/forms';
import { ArticleDTO } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-make-article',
  templateUrl: './make-article.component.html',
  styleUrls: ['./make-article.component.css']
})
export class MakeArticleComponent implements OnInit {

  taskId: string;
  magazineId: number;
  name: string;
  title: string;
  processId: string;
  camundaService: CamundaService;
  articleService: ArticleService;
  formFieldsDto = null;
  formFields = [];
  selectedPdf: File;
  instanceId: string;

  constructor(private camService: CamundaService, private artService: ArticleService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.articleService = artService;
    this.camundaService = camService;

    this.activatedRoute.params.subscribe(params => {
      this.taskId = params["taskId"];
      this.magazineId = params["magazineId"];
    });

    let x = this.camundaService.getTask(this.taskId).subscribe(
      res => {
        this.formFieldsDto = res;
        this.formFields = res.formField;
        this.instanceId = res.processInstanceId;
      },
      () => {
        console.log("Error occured");
      }
    );
  }

  ngOnInit() {
  }

  saveArticle(article: ArticleDTO, form: NgForm){
    let body = new FormData();
    body.append('pdf', this.selectedPdf);
    body.append('fileName', article.title);
    body.append('processInstanceId', this.instanceId);
    body.append('taskId', this.taskId);
    body.append('magazineId', this.magazineId.toString());

    const articleJson = JSON.stringify(article);
    body.append("article", articleJson);

    let x = this.articleService.postArticle(body).subscribe(
      res => {
        alert("dodat artikal");
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
