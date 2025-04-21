import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import MetisMenu from 'metismenujs';
import { filter } from 'rxjs';
import SimpleBar from 'simplebar';
// import { MetisMenu } from 'metismenujs';
// import SimpleBar from 'simplebar';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent {
  currentUrl: string = "";

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
    });
  }

  ngOnInit() {
    new MetisMenu("#side-menu");
    new SimpleBar(document.getElementById('simplebar') as HTMLElement);
    this.currentUrl = this.router.url;
  }

  isActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }
}
