import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router, NavigationStart } from '@angular/router';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-mobile-bottom-nav',
  templateUrl: './mobile-bottom-nav.component.html',
  styleUrls: ['./mobile-bottom-nav.component.scss']
})
export class MobileBottomNavComponent implements OnInit {

  currentUrl = '';
  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private focusMonitor: FocusMonitor) { }

  ngOnInit(): void {
    // console.log('path: '+ this.router.url);
    // this.focusMonitor.monitor(elRef.nativeElement, true)
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
