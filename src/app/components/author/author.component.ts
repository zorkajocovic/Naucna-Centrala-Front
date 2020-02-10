import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration.service';
import { CamundaService } from 'src/app/services/camunda.service';
import { LoginService } from 'src/app/services/login.service';
import { MagazineService } from 'src/app/services/magazine.service';
import { NgForm } from '@angular/forms';
import { TaskDto } from 'src/app/models/TaskDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  private taskList = [];
  private userService: RegistrationService;
  private camundaService: CamundaService
  private currentTaskId: string;
  formFields = [];
  loginService: LoginService;
  currentUser: any;
  magazineService: MagazineService;
  magazineId: number;

  constructor(private camService: CamundaService, private magService: MagazineService,
    private logService: LoginService, private usrService: RegistrationService,
    private activatedRoute: ActivatedRoute, private router: Router) {

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

  getTasks() {
    this.camundaService.getTasksForUser().subscribe(data => {
      this.taskList = data;
      this.formFields = data.formField;
      this.currentTaskId = data.taskId;
    }),
      () => {
        alert("Nije uspelo")
      }
  }

  getTask(task: TaskDto) {
    if (task.name == "Insert article") {
      this.router.navigate(['make-article/'.concat(task.taskId).concat("/") + this.magazineId]);
    } else if (task.name == "Insert subscription details") {
      this.router.navigate(['subscribe/'.concat(task.taskId).concat("/") + this.magazineId]);
    }
  }

}
