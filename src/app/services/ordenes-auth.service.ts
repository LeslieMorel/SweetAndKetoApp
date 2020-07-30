import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesAuthService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | import('@angular/router').UrlTree |
    import('rxjs').Observable<boolean | import('@angular/router').UrlTree> |
    Promise<boolean | import('@angular/router').UrlTree> {
      const roles: string[] = route.data.roles;
      const isInRole = this.authService.user.roles.some( r => roles.includes(r));
      console.log(route.data);
      console.log('userRoles: ' + this.authService.userData.roles.toString());
      console.log('reqRoles: ' + roles);
      console.log('isInRole: ' + isInRole);


      if (isInRole){
        console.log('isInRole');
        return true;
      } else {
        console.log('Not InTole vaya de ahi');
        this.router.navigate(['tienda']);
      }
  }
}
