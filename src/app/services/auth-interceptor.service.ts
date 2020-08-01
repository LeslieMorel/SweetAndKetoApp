// Clase para colocar el header del HttpRequest y para colocar la URL Base;

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  // Base URL Server
  // baseURL = 'http://localhost:51506/api/'; // Local
  baseURL = 'https://sweetandketoapi20200720220539.azurewebsites.net/api/';  // Azure

  constructor(private authServ: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.authServ.userData === undefined) {
      console.log('undefines userData');
      const modifiedReq = req.clone({
        url: this.baseURL + req.url
      });
      return next.handle(modifiedReq);
    } else {
      const token = this.authServ.userData.token;
      const modifiedReq = req.clone({
        setHeaders: {Authorization: 'Bearer ' + token },
        url: this.baseURL + req.url
      });
      // console.log(modifiedReq);
      return next.handle(modifiedReq);
    }

  }

}
