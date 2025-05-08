import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public userCurrent: any={};

  constructor(
    private router: Router,
    private authService: AuthService,

  ) { 
    this.authService.userCurrent.subscribe((user) => {
      this.userCurrent = user;
  });
  }


  
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
      this.handleLogOut();
      return;
    }

    if (targetElement.classList.contains('user-dropdown-item')) {
      this.isShowDropdownUser = true;
    } else {
      this.isShowDropdownUser = false;
    }
  }
  
  // public handleOnLogout(){
  //   // this.authService.logout();

  //   this.router.navigate(['/auth/login']);
  // }

  handleLogOut() {
    this.authService.logout().subscribe((res) => {
        if (res.status == true) {
            this.authService.setAuthTokenLocalStorage(null);
            localStorage.removeItem('cachedProducts');
            this.router.navigate([Page.Login]);
            window.location.reload(); //load lại trang tny
        }
    });
}
}
