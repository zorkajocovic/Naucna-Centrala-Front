import { Component, OnInit } from '@angular/core';
import { MagazineService } from 'src/app/services/magazine.service';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  private magazineService: MagazineService;
  private camundaService: CamundaService;
  private formFieldsDto = null;
  private formFields = [];
  private processInstance = "";
  private tasks = [];
  private currentTaskId: string;
  private magazineId: number;
  private loginService: LoginService;
  private currentUser: any;

  constructor(private magazineSer: MagazineService, private logService: LoginService, private camService: CamundaService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.magazineService = magazineSer;
    this.camundaService = camService;
    this.loginService = logService;

    this.activatedRoute.params.subscribe(params => {
      this.magazineId = params["magazineId"];
    });

    let x = this.magazineService.startProcess(this.magazineId).subscribe(
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

}
