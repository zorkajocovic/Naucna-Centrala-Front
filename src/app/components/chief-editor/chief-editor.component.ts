import { Component, OnInit } from '@angular/core';
import { TaskDto } from 'src/app/models/TaskDto';
import { CamundaService } from 'src/app/services/camunda.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chief-editor',
  templateUrl: './chief-editor.component.html',
  styleUrls: ['./chief-editor.component.css']
})
export class ChiefEditorComponent implements OnInit {

  camundaService: CamundaService;
  noReviewers: number = 0;

  private taskList = [];
  private currentTaskId: string;
  formFields = [];

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
    if (task.name == "Review article") {
      this.router.navigate(['review-article/'.concat(task.taskId)]);
    } else if (task.name == "Editor checks PDF file") {
      this.router.navigate(['check-pdf/'.concat(task.taskId)]);
    } else if (task.name == "Author corrects PDF") {
      this.router.navigate(['correct-pdf/'.concat(task.taskId)]);
    } else if (task.name == "Number Of Reviewers") {
      this.router.navigate(['number-reviewers/'.concat(task.taskId)]);
    } else if (task.name == "Choose reviewers") {
      this.router.navigate(['choose-reviewers/'.concat(task.taskId) + "/" + this.noReviewers]);
    } else if (task.name == "Editor decides about reviews of reviewers") {
      this.router.navigate(['decide/'.concat(task.taskId)]);
    } 
  }

}
