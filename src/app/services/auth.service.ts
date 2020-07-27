import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User  = {
    userName: 'Jhernandez',
    token: 'aiswjfoiwjefoiwjnef',
    roles: ['ordenesEdit', 'ordenesRead']
  };
  constructor() { }
}

export class User {
  userName: string;
  token: string;
  roles: string[];

}
