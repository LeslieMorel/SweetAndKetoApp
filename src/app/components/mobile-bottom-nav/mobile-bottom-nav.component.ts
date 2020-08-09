import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-bottom-nav',
  templateUrl: './mobile-bottom-nav.component.html',
  styleUrls: ['./mobile-bottom-nav.component.scss']
})
export class MobileBottomNavComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // console.log('path: '+ this.router.url);

    this.activeRoute.url.subscribe((resp)=> {
      console.log('path');

      console.log(resp[0].path);
    });

    // this.activeRoute.pa
    this.activeRoute.outlet

  }

}
