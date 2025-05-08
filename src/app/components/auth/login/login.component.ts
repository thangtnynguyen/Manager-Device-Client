import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //State
  loginForm: FormGroup;

  validationMessages = {
    email: [
      { type: 'required', message: 'Tên người dùng không được để trống' },
    ],
    password: [
      { type: 'required', message: 'Mật khẩu không được để trống' },
    ],
  };
  
 //Init
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router,private messageService: MessageService) {
    this.loginForm = this.fb.group({
	  username: ['', Validators.required],
      password: ['', [Validators.required, Validators.email]],
      rememberMe: [true, Validators.required],
      type: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });
  }

  ngOnInit() {}

  //Core
	Page = Page;

  public handleLogin() {
		const request: any = this.loginForm.value;
		this.authService.loginByUsername(request).subscribe(
			(res) => {
				if (res.status) {
					this.messageService.add({
						severity: 'sucess',
						summary: 'Thành công',
						detail: res.message,
					});
					this.authService.setAuthTokenLocalStorage(res.data);
					this.authService.fetchUserCurrent().subscribe((data) => {
                        this.authService.setUserCurrent(data.data);
                    });
					this.router.navigate([Page.Menu]);
				}
				else{
					this.messageService.add({
						severity: 'warning',
						summary: 'Thất bại',
						detail: res.message,
					});
				}
			},
			(exception) => {
				this.messageService.add({
					severity: 'error',
					summary: 'Lỗi',
					detail: 'Lỗi hệ thống',
				});
				console.log(exception?.error.Message);
			}
		);
	}

  // handleLogin(){
  //   this.router.navigate(['page/menu']);
  // }
}
