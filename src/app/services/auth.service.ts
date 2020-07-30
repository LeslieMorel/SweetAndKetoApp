import { Injectable } from '@angular/core';
import { UserInfo } from '../models/auth/userInfo.model';
import { HttpClient } from '@angular/common/http';
import { UserLogData } from '../models/auth/userLogData.model';
import { UsuarioData } from '../models/auth/usuarioData.model';
import * as jwt_decode from 'jwt-decode';
import { UserTokenModel } from '../models/auth/userToken.model';
import { Router } from '@angular/router';
import { UserRolesModel } from '../models/auth/userRoles.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: UsuarioData;
  user: User  = {
    userName: 'Jhernandez',
    token: 'aiswjfoiwjefoiwjnef',
    roles: ['ordenesEdit', 'ordenesRead']
  };
  constructor(private http: HttpClient, private router: Router) { }

  Register(userInfo: UserInfo){
    return this.http.post('Auth/Register', userInfo);
  }
  Login(userInfo: UserInfo){
    return this.http.post('Auth/Login', userInfo);
  }

  public tokenVigente(tokenExpiration: number): any {
    const url = `Cuentas/AutoLog`;
    return this.http.post(url, tokenExpiration );
  }
  public logOut() {
    this.userData = undefined;
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  public userIsInRole(role: string) {
    if (this.userData === undefined) {
      return false;
    }
    if (this.userData.roles === undefined) {
      return false;
    }
    if (this.userData.roles.includes('Admin')) {
      return true;
    }
    return this.userData.roles.includes(role);
  }
  public unRegisteredUser() {
    if (this.userData === undefined) {
      return false;
    }
    if (this.userData.roles === undefined) {
      return false;
    }
  }
  public AdminUser() {
    if (this.userData === undefined || this.userData.roles === undefined ) {
      return false;
    }
    if (typeof this.userData.roles === 'string') {
      return this.userData.roles === UserRolesModel.Admin;
    }
    return this.userData.roles.includes(UserRolesModel.Admin);
  }
  public userInRoles(roles: string[]): boolean {
    let IsInRole = false;

    if (this.userData === undefined) {
      return false;
    }
    if (this.userData !== undefined) {
      if (this.AdminUser()) { IsInRole = true; }

      if (this.unRegisteredUser()) { IsInRole = false; }

      if (typeof this.userData.roles === 'string' && roles.includes(this.userData.roles)) {
        IsInRole = true;
      }
      if (typeof this.userData.roles === 'object') {
        roles.forEach(role => {
          const result = this.userData.roles.includes(role);
          if (result) {
            IsInRole = true;
          }
        });
      }
    }

    // AllowAnonymous == Open Link
    if (roles.includes(UserRolesModel.AllowAnonymous)) {
      IsInRole = true;
    }
    return IsInRole;
  }

  // Login
  public setUserData(resp: UserTokenModel) {
    // console.log(resp);
    const tokenDecode: {email: string, exp: number, Roles: string[], unique_name: string } = jwt_decode(resp.token);
    console.log('token-Decode:');
    console.log(tokenDecode);
    this.userData = new UsuarioData();
    this.userData.token = resp.token;
    this.userData.tokenExpiration = resp.expiration;
    this.userData.email = tokenDecode.email;
    this.userData.userName = tokenDecode.unique_name;
    this.userData.roles = tokenDecode.Roles !== undefined ? tokenDecode.Roles : [];
    this.userData.tokenExpNumber = tokenDecode.exp;
    const userDataToString = JSON.stringify(this.userData);
    // console.log(this.userData);
    localStorage.setItem('userData', userDataToString);

  }
  public autoLogin() {
    const datosUsuario = localStorage.getItem('userData');
    if (datosUsuario !== undefined && datosUsuario !== null) {

      this.userData = JSON.parse(datosUsuario);
      console.log(this.userData);
      const actualDate = Date.now().toString();
      const actualDateUTC =  actualDate.substring(0, actualDate.length - 3);
      const dateUtcNow = parseInt(actualDateUTC, 10);

      console.log('Actual Date' + actualDateUTC);
      console.log('Token ExpDate' + this.userData.tokenExpNumber);

      // this.tokenVigente(this.userData.tokenExpNumber).subscribe((Response: any) => {
      //   if (Response === true) {
      //     console.log('Token Vigente');
      //   } else {
      //     this.logOut();
      //   }
      // });


      if (this.userData.tokenExpNumber < dateUtcNow) {
        console.log('Token Vencido');
        this.logOut();

      } else {
        console.log('Token vigente');
      }
    }
    // console.log('UserData:');
    // console.log(this.userData);
  }
}

export class User {
  userName: string;
  token: string;
  roles: string[];

}
