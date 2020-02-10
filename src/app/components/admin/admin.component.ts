import { Component, OnInit } from '@angular/core';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { LoginService } from 'src/app/services/login.service';
import { MagazineService } from 'src/app/services/magazine.service';
import { MagazinesComponent } from '../magazines/magazines.component';
import { TaskDto } from 'src/app/models/TaskDto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private taskList = null;
  private userService: RegistrationService;
  private camundaService: CamundaService
  private currentTaskId: string;
  formFields = [];
  loginService: LoginService;
  currentUser: any;
  magazineService: MagazineService;
  magazineId: number;

  constructor(private camService: CamundaService, private magService: MagazineService, private logService: LoginService, private usrService: RegistrationService,  private activatedRoute: ActivatedRoute, private router: Router) {
    this.camundaService = camService;
    this.userService = usrService;
    this.loginService = logService;
    this.magazineService = magService;

    this.activatedRoute.params.subscribe(params => {
      this.magazineId = params["magazineId"];
    });
    let x = this.magazineService.startProcess(this.magazineId).subscribe(
      res => {
        this.getTasks();
      },
      () => {
        console.log("Error occured");
      }
    );
  }

  ngOnInit() {
  }

  getTasks(){
    this.camundaService.getTasksForUser().subscribe(data =>{
      debugger
      this.taskList = data;
      this.formFields = data.formField;
      this.currentTaskId = data.taskId;
    }),
    () =>{
      alert("Nije uspelo")
    }
  }

  onSubmit(value, form: NgForm) {
    let o = new Array();
    for (var property in value) {
      console.log(property);
      console.log(value[property]);
      o.push({fieldId : property, fieldValue : value[property]});
    }

this.userService.setAsReviewer(o, this.currentTaskId).subscribe(
      data => {
        debugger
        alert("Uspesno ste se dodelili ulogu Urednika!")
      },
      error => {
        alert("nije uspela registracija")
      });

  }
 
  getTask(task: TaskDto){

    if(task.name == "Insert article"){
        this.router.navigate(['make-article/'.concat(task.taskId).concat("/") + this.magazineId]);
      }else if(task.name == "Insert subscription details"){
        this.router.navigate(['subscribe/'.concat(task.taskId).concat("/") + this.magazineId]);
    }
  }
}
