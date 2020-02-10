import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class IsAuthor implements CanActivate {

  constructor() {}

  canActivate() {
    return localStorage.role == 'AUTHOR';
  }
}