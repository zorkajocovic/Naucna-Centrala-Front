import { Component, OnInit } from '@angular/core';
import { CamundaService } from 'src/app/services/camunda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MagazineService } from 'src/app/services/magazine.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  taskId: string;
  magazineId: number;
  name: string;
  title: string;
  processId: string;
  camundaService: CamundaService;
  magazineService: MagazineService;
  formFieldsDto = null;
  formFields = [];
  selectedPdf: File;
  instanceId: string;

  constructor(private camService: CamundaService, private magService: MagazineService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.magazineService = magService;
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

  pay(payed, form: NgForm) {

    let x = this.magazineService.paySubscribtion(this.taskId, this.instanceId, this.magazineId, payed["payed"]).subscribe(
      res => {
        if (res == true)
          alert("Uspjesno ste platili clanarinu!")
        else {
          alert("Niste platili clanarinu!")
        }
      },
      () => {
        console.log("Error occured");
      }
    );
  }
}
