import { Component } from '@angular/core';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.css']
})
export class AccountRequestComponent {

  request = {
    studentId: '',
    email: '',
    phone: '',
    classCode: '',
    position: '',
    reason: ''
  };

  onSubmit() {
    console.log('Yêu cầu cấp tài khoản đã gửi:', this.request);
  }
}
