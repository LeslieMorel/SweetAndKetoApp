import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-mobile-bottom-nav',
  templateUrl: './mobile-bottom-nav.component.html',
  styleUrls: ['./mobile-bottom-nav.component.scss']
})
export class MobileBottomNavComponent implements OnInit {

  currentUrl = '';
  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // console.log('path: '+ this.router.url);

    this.router.events.subscribe(e => {
      if(e instanceof NavigationStart){
        console.log(e.url);
        this.currentUrl = e.url;
      }
    });
    // this.activeRoute.pa
    this.activeRoute.outlet

  }

}
