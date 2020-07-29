import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserTokenModel } from 'src/app/models/auth/userToken.model';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TipoSnackBar } from '../../snackbar/snackbar.component';
import { SnackbarPanelClass } from 'src/app/models/SnackBarPanelClass.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authServ: AuthService,
              private snackServ: SnackbarService,
              private router: Router) { }

  userInfoForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  ngOnInit(): void {
  }

  Login(){
    if(this.userInfoForm.valid){
      this.authServ.Login(this.userInfoForm.value).subscribe((Response: UserTokenModel) => {
        console.log(Response);
        this.snackServ.Show('Loggin exitoso', TipoSnackBar.Success, 2000, SnackbarPanelClass.success);
        this.authServ.setUserData(Response);
        this.router.navigate(['/tienda']);
      }, e => {
        console.log(e);
        this.snackServ.Show('Password o usuario incorrectos', TipoSnackBar.Error, 2000, SnackbarPanelClass.error);

      });
    } else {
      this.snackServ.Show('Error en validación, complete los campos', TipoSnackBar.Error, 2000, SnackbarPanelClass.error);

    }
  }

}
