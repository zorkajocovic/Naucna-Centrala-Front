import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class IsMainEditor implements CanActivate {

  constructor() {}

  canActivate() {
    return localStorage.role == 'MAIN_EDITOR';
  }
}