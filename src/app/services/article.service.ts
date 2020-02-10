import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  postArticle(body) {
    return this.httpClient.post('http://localhost:8090/api/article/add', body) as Observable<any>
  }

  reuploadPdf(body) {
    return this.httpClient.post('http://localhost:8090/api/article/reupload', body) as Observable<any>
  }

  getArticleDetails(taskId: string) {
    return this.httpClient.get('http://localhost:8090/api/article/getNew/'.concat(taskId)) as Observable<any>
  }

  decide(taskId: string, authorEmail: string, approve) {
    return this.httpClient.get('http://localhost:8090/api/article/tasks/submit/'.concat(taskId) +
      "/" + authorEmail +
      "/" + approve) as Observable<any>
  }

  decidePdf(taskId: string, authorEmail, goodFormat, body) {
    return this.httpClient.post('http://localhost:8090/api/article/tasks/submit/'.concat(taskId)
      .concat("/") + authorEmail +
      "/" + goodFormat, body) as Observable<any>
  }

  getTask(taskId: string) {
    return this.httpClient.get('http://localhost:8090/api/article/get/'.concat(taskId)) as Observable<any>
  }

  insertNumberReviewers(taskId: String, number: number) {
    return this.httpClient.get('http://localhost:8090/api/article/numberOfReviewers/' + number + "/" + taskId) as Observable<any>
  }

  getReviewers(taskId: String) {
    return this.httpClient.get('http://localhost:8090/api/article/getReviewers/' + taskId) as Observable<any>
  }

  addReviewers(taskId, body) {
    return this.httpClient.post('http://localhost:8090/api/article/addReviewers/'.concat(taskId), body) as Observable<any>
  }
  
  review(taskId, body) {
    return this.httpClient.post('http://localhost:8090/api/article/review/'.concat(taskId), body) as Observable<any>
  }

  finalDecide(taskId, body) {
    return this.httpClient.post('http://localhost:8090/api/article/decide/'.concat(taskId), body) as Observable<any>
  }
}
