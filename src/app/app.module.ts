import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CreateMagazineComponent } from './components/create-magazine/create-magazine.component';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { SciFieldComponent } from './components/sci-field/sci-field.component';
import { CheckMailComponent } from './components/check-mail/check-mail.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { MakeArticleComponent } from './components/make-article/make-article.component';
import { LoginService } from './services/login.service';
import { TokenInterceptor } from './interceptors/interceptor';
import { IsSomeLogged } from './components/guard/IsSomeLogged';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PublishComponent } from './components/publish/publish.component';
import { EditorComponent } from './components/editor/editor.component';
import { AuthorComponent } from './components/author/author.component';
import { ChiefEditorComponent } from './components/chief-editor/chief-editor.component';
import { IsAuthor } from './components/guard/auth.author';
import { IsMainEditor } from './components/guard/auth.mainEditor';
import { IsReviewer } from './components/guard/auth.reviewer';
import { IsEditor } from './components/guard/auth.editor';
import { IsAdmin } from './components/guard/auth.admin';
import { ReviewerComponent } from './components/reviewer/reviewer.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ReviewArticleComponent } from './components/review-article/review-article.component';
import { CheckPdfComponent } from './components/check-pdf/check-pdf.component';
import { CorrectPdfComponent } from './components/correct-pdf/correct-pdf.component';
import { ReviewersNumberComponent } from './components/reviewers-number/reviewers-number.component';
import { ReviewersChooseComponent } from './components/reviewers-choose/reviewers-choose.component';
import { ReviewersReviewComponent } from './components/reviewers-review/reviewers-review.component';
import { DecideComponent } from './components/decide/decide.component';

const Routes = [
  {
    path: "check-mail",
    component: CheckMailComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: MagazinesComponent
  },
  {
    path: "make-article/:taskId/:magazineId",
    component: MakeArticleComponent
  },
  {
    path: "subscribe/:taskId/:magazineId",
    component: SubscriptionComponent
  },
  {
    path: "publish",
    component: PublishComponent
  },
  {
    path: "author/:magazineId",
    component: AuthorComponent
  },
  {
    path: "editor/:no-reviewers",
    component: EditorComponent
  },
  {
    path: "chief-editor/:no-reviewers",
    component: ChiefEditorComponent
  },
  {
    path: "reviewer",
    component: ReviewerComponent
  },
  {
    path: "addScientifiField/:processInstance/:noOfSciAreas",
    component: SciFieldComponent,
  },
  {
    path: "my-tasks",
    component: TasksComponent
  },
  {
    path: "review-article/:taskId",
    component: ReviewArticleComponent
  },
  {
    path: "check-pdf/:taskId",
    component: CheckPdfComponent
  },
  {
    path: "correct-pdf/:taskId",
    component: CorrectPdfComponent
  },
  {
    path: "number-reviewers/:taskId",
    component: ReviewersNumberComponent
  },
  {
    path: "choose-reviewers/:taskId/:no-reviewers", 
    component: ReviewersChooseComponent
  },
  {
    path: "reviewers-review/:taskId",
    component: ReviewersReviewComponent
  },
  {
    path: "decide/:taskId",
    component: DecideComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CreateMagazineComponent,
    NavbarComponent,
    HomeComponent,
    AdminComponent,
    SciFieldComponent,
    MagazinesComponent,
    CheckMailComponent,
    ArticlesComponent,
    MakeArticleComponent,
    SubscriptionComponent,
    PublishComponent,
    ReviewerComponent,
    EditorComponent,
    AuthorComponent,
    ChiefEditorComponent,
    TasksComponent,
    ReviewArticleComponent,
    CheckPdfComponent,
    CorrectPdfComponent,
    ReviewersNumberComponent,
    ReviewersChooseComponent,
    ReviewersReviewComponent,
    DecideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule
  ],
  providers: [
    LoginService,
    IsAuthor,
    IsAdmin,
    IsEditor,
    IsReviewer,
    IsMainEditor,
    IsSomeLogged,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'IsSomeLogged',
      useValue: () => {
        return true;
      } 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
