import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class IsEditor implements CanActivate {

  constructor() {}

  canActivate() {
    return localStorage.role == 'EDITOR';
  }
}