import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { MagazineService } from 'src/app/services/magazine.service';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrls: ['./magazines.component.css']
})
export class MagazinesComponent implements OnInit {

  private magazineService: MagazineService;
  magazines = [];

  constructor(magazineService: MagazineService) { 
    this.magazineService = magazineService;
  }

  ngOnInit() {
    this.getAllMagazines();
  }

  getAllMagazines() {
    this.magazineService.getAllMagazines().subscribe(
      data => {
        this.magazines = data;
      },
      error => {
        alert("nije uspelo")
      })
  }
}
