// Clase para colocar el header del HttpRequest y para colocar la URL Base;

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders
} from '@angular/common/http';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  // Base URL Server
  // baseURL = 'http://localhost:51506/api/'; // Local
  baseURL = 'https://sweetandketoapi20200720220539.azurewebsites.net/api/';  // Azure

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('Request Intercept: ');
    console.log(req);

    if (req.url === 'Auth'){
      // this.baseURL === ''
    }

    const modifiedReq = req.clone({
      url: this.baseURL + req.url
    });
    return next.handle(modifiedReq);

     }

}
