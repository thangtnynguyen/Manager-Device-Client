import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { AccountRequestService } from 'src/app/core/services/account-request.service';

@Component({
  selector: 'app-account-request',
  templateUrl: './account-request.component.html',
  styleUrls: ['./account-request.component.css']
})
export class AccountRequestComponent {

  requestForm!: FormGroup;
  isSubmitting: boolean = false;

  // Lời nhắn xác thực cho các trường
  validationMessages = {
    name: [
      { type: 'required', message: 'Tên sinh viên/giảng viên không được để trống' },
    ],
    code: [
      { type: 'required', message: 'Mã sinh viên/giảng viên không được để trống' },
    ],
    email: [
      { type: 'required', message: 'Email không được để trống' },
      { type: 'email', message: 'Email không hợp lệ' },
    ],
    phoneNumber: [
      { type: 'required', message: 'Số điện thoại không được để trống' },
    ],
    classCode: [
      { type: 'required', message: 'Mã lớp không được để trống' },
    ],
    position: [
      { type: 'required', message: 'Chức vụ hiện tại không được để trống' },
    ],
    reason: [
      { type: 'required', message: 'Lý do yêu cầu không được để trống' },
    ]
  };

  constructor(private fb: FormBuilder, private messageService: MessageService, private accountRequestService: AccountRequestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Khởi tạo form với các formControl và validation
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      classCode: ['', Validators.required],
      position: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.isSubmitting) {
      return;
    }
    if (this.requestForm.valid) {
      const request = this.requestForm.value;
      this.isSubmitting = true;
      this.accountRequestService.create(request).subscribe(
        (res) => {
          if (res.status == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Gửi yêu cầu thành công',
              detail: 'Thông tin đã được gửi thành công!'
            });
            // this.router.navigate(['/auth/login'])
            this.requestForm.reset();
          }
          else {
            this.messageService.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: res.message,
            });
          }
        },
        (exception) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Lỗi hệ thống: Tên vai trò không được trùng nhau',
          });
          this.isSubmitting = false;

        },
        () => {
          this.isSubmitting = false;
        })
    }
    else {
      markAllAsTouched(this.requestForm);
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Vui lòng kiểm tra lại thông tin!'
      });
    }
  }

}
