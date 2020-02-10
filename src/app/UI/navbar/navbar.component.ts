import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { IsSomeLogged } from 'src/app/components/guard/IsSomeLogged';
import { Router } from '@angular/router';
import { IsAuthor } from 'src/app/components/guard/auth.author';
import { IsEditor } from 'src/app/components/guard/auth.editor';
import { IsMainEditor } from 'src/app/components/guard/auth.mainEditor';
import { IsReviewer } from 'src/app/components/guard/auth.reviewer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 loginService: LoginService;
 loggedIn: boolean;
 isAuthor: IsAuthor;

  constructor(private logged: IsSomeLogged, private isAuth: IsAuthor, private isEditor: IsEditor,
                                            private isMainEditor: IsMainEditor, private isReviewer: IsReviewer,
                                            private service: LoginService, private router: Router) {
    this.service.currentLoginState.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.isAuthor = isAuth;
  }

  ngOnInit() {
    this.loggedIn = this.logged.canActivate();
  }
  
logOut(){
  localStorage.removeItem('jwt');
  localStorage.removeItem('role');
  this.loggedIn = this.logged.canActivate();
  this.router.navigate(['login']);
}

loggedAuthor(){
  return this.isAuthor.canActivate();
}

loggedEditor(){
  return this.isEditor.canActivate();
}

loggedReviewer(){
  return this.isReviewer.canActivate();
}

loggedMainEditor(){
  return this.isMainEditor.canActivate();
}

}
