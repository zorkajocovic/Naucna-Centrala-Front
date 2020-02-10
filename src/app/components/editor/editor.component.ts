import { Component, OnInit } from '@angular/core';
import { TaskDto } from 'src/app/models/TaskDto';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  camundaService: CamundaService;

  taskList = [];
  currentTaskId: string;
  formFields = [];
  noReviewers = 0;

  constructor(private camService: CamundaService, private actRoute: ActivatedRoute, private router: Router) {
    this.camundaService = camService;
    this.actRoute.params.subscribe(params => {
      this.noReviewers = params["no-reviewers"];
    });
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
    if (task.name == "Choose reviewers") {
      this.router.navigate(['choose-reviewers/'.concat(task.taskId).concat("/") + this.noReviewers]);
    } else if (task.name == "Number Of Reviewers") {
      this.router.navigate(['number-reviewers/'.concat(task.taskId)]);
    }
  }

}
