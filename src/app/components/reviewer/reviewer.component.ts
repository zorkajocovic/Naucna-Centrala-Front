import { Component, OnInit } from '@angular/core';
import { TaskDto } from 'src/app/models/TaskDto';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {

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
    if (task.name == "Reviewers reviewing article") {
      this.router.navigate(['reviewers-review/'.concat(task.taskId)]);
    }
  }
}
