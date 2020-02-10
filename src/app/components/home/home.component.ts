import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private regService: RegistrationService;
  private tasks: [];

  constructor(private service: RegistrationService, private router: Router) {
    this.regService = service;
  }

  ngOnInit() {
  }

}
