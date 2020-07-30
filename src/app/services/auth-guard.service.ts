import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authServ: AuthService) { }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                 boolean | import('@angular/router').UrlTree |
                 import('rxjs').Observable<boolean | import('@angular/router').UrlTree>
                | Promise<boolean | import('@angular/router').UrlTree>
  {
    const roles: string[] = route.data.roles;
    console.log(roles.toString());
    console.log(this.authServ.userData);

    if (roles){
      return this.authServ.userInRoles(roles);
    } else {
      return true;
    }
  }
}
