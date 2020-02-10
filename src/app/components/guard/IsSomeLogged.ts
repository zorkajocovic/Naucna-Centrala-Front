import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class IsSomeLogged implements CanActivate {

  constructor() {}

  canActivate() {
    return localStorage.jwt ? true : false;
  }
}