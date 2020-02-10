import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CamundaService } from 'src/app/services/camunda.service';
import { TaskDto } from 'src/app/models/TaskDto';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  camundaService: CamundaService;

  private taskList = [];
  private currentTaskId: string;
  formFields = [];

  constructor(private camService: CamundaService, private router: Router) {
    this.camundaService = camService;
  }

  ngOnInit() {
    this.getTasks();
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
    if (task.name == "Review article") {
      this.router.navigate(['review-article/'.concat(task.taskId)]);
    } else if (task.name == "Editor checks PDF file") {
      this.router.navigate(['check-pdf/'.concat(task.taskId)]);
    } else if (task.name == "Author corrects PDF") {
      this.router.navigate(['correct-pdf/'.concat(task.taskId)]);
    } else if (task.name == "Number Of Reviewers") {
      this.router.navigate(['number-reviewers/'.concat(task.taskId)]);
    } else if (task.name == "Editor decides about reviews of reviewers") {
      this.router.navigate(['decide/'.concat(task.taskId)]);
    } 
  }
}
