import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppComponent {
  title = 'SweetAndKetoApp';
  constructor(private authService: AuthService,private activeRoute: ActivatedRoute){
    this.authService.autoLogin();
    this.activeRoute.url.subscribe((resp) => {
      console.log('path');

      console.log(resp[0].path);

    });

  }
}
