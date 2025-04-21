import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    username: [
      { type: 'required', message: 'Tên người dùng không được để trống' },
    ],
    password: [
      { type: 'required', message: 'Mật khẩu không được để trống' },
    ],
  };
  
 //Init
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.email]],
      rememberMe: [true, Validators.required],
      type: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });
  }

  ngOnInit() {}

  handleLogin(){
    this.router.navigate(['page/menu']);
  }
}
