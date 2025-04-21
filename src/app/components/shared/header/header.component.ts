import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router
  ) { }
  
  ngOnInit() {
  }

  public config: any = {
    baseUrl: '',
  }

  //User
  public isShowDropdownUser: boolean = false;

  @HostListener('document:click', ['$event'])
  public toggleDropdownUser(event: any): void{
    const targetElement = event.target as HTMLElement;

    if (targetElement.classList.contains('logout-button')) {
      this.handleOnLogout();
      return;
    }

    if (targetElement.classList.contains('user-dropdown-item')) {
      this.isShowDropdownUser = true;
    } else {
      this.isShowDropdownUser = false;
    }
  }
  
  public handleOnLogout(){
    // this.authService.logout();

    this.router.navigate(['/auth/login']);
  }
}
