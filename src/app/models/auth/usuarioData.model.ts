export class UsuarioData {
  userName: string;
  email: string;
  token: string;
  roles: string | string[];
  tokenExpiration: Date;
  tokenExpNumber: number;
  public IsTokenExpired(): boolean {
    return this.tokenExpNumber < Date.now();
  }
  constructor() {
    this.roles = [];
  }
  esAdmin(): boolean {
    if (typeof this.roles === 'string') {
      return this.roles === 'Admin';
    } else {
      return this.roles.includes('Admin');
    }
  }
}
