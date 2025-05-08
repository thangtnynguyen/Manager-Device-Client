import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { DeviceLogService } from 'src/app/core/services/device-log.service';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrls: ['./detail-profile.component.css']
})
export class DetailProfileComponent {

  user: any = {};
  isSubmitting: boolean = false;
  deviceLogs: any = [];


  //search
  paging: any = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: '',
    orderBy: '',
    totalRecords: 0,
    totalPages: 0,
  };
  config: any = {
    paging: pagingConfig.default,
    baseUrl: systemConfig.baseFileSystemUrl,
    perPageOptions: DEFAULT_PER_PAGE_OPTIONS,
    pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
  };
  queryParameters: any = {
    ...this.config.paging,
    keyWord: null,
    sortBy: null,
    orderBy: null,
  };


  passwordForm!: FormGroup;
  showPasswordChangeForm: boolean = false;

  validationMessages = {
    oldPassword: [
      { type: 'required', message: 'Mật khẩu cũ không được để trống' },
      { type: 'minlength', message: 'Mật khẩu cũ phải có ít nhất 6 ký tự' }
    ],
    newPassword: [
      { type: 'required', message: 'Mật khẩu mới không được để trống' },
      { type: 'minlength', message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Nhập lại mật khẩu mới không được để trống' },
      { type: 'minlength', message: 'Mật khẩu nhập lại phải có ít nhất 6 ký tự' },
      { type: 'passwordMatch', message: 'Mật khẩu mới và xác nhận mật khẩu không khớp' }
    ]
  };

  constructor(private route: ActivatedRoute, private authService: AuthService, private fb: FormBuilder, private messageService: MessageService, private deviceLogService: DeviceLogService) {
    this.authService.userCurrent.subscribe((user: any) => {
      this.user = user;
      this.user.history = [
        {
          date: '2023-05-10',
          device: 'Laptop',
          action: 'Mượn',
          deviceImage: 'https://demoda.vn/wp-content/uploads/2022/05/anh-may-tinh-laptop-trang-cho-dan-van-phong.jpg'
        },
        {
          date: '2023-05-12',
          device: 'Máy chiếu',
          action: 'Trả',
          deviceImage: 'https://demoda.vn/wp-content/uploads/2022/05/anh-may-tinh-laptop-trang-cho-dan-van-phong.jpg'
        },
        {
          date: '2023-06-01',
          device: 'Điện thoại',
          action: 'Mượn',
          deviceImage: 'https://demoda.vn/wp-content/uploads/2022/05/anh-may-tinh-laptop-trang-cho-dan-van-phong.jpg'
        }
      ]
    })
  }


  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.passwordForm.get('confirmPassword')?.setValidators([
      Validators.required,
      Validators.minLength(6),
      this.passwordMatchValidator.bind(this)
    ]);



    this.route.queryParams.subscribe((params) => {
      const request = {
        ...params,
        userActionId:this.user.id,
        pageIndex: params['pageIndex']
          ? params['pageIndex']
          : this.config.paging.pageIndex,
        pageSize: params['pageSize']
          ? params['pageSize']
          : this.config.paging.pageSize
      };
      this.queryParameters = {
        ...params,
        keyWord: this.queryParameters.keyWord ? this.queryParameters.keyWord.trim() : null,
        sortBy: this.queryParameters.sortBy || null,
        orderBy: this.queryParameters.orderBy || null
      };
      this.getDeviceLogs(request);

    });
  }

  passwordMatchValidator(control: any) {
    if (control.value !== this.passwordForm.get('newPassword')?.value) {
      return { passwordMatch: true };
    }
    return null;
  }



  getDeviceLogs(request: any) {
    this.deviceLogService.getByUser(request).subscribe(res => {
      if (res) {
        this.deviceLogs = res.data.items.map((item: any) => {
          return {
            ...item
          };
        });
        if (this.deviceLogs.length === 0) {
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = res.data;
        this.paging = paging;
      }
    })
  }



  onSubmit() {
    if (this.isSubmitting) {
      return;
    }
    if (this.passwordForm.valid) {
      const request = this.passwordForm.value;
      this.isSubmitting = true;
      this.authService.changePassword(request).subscribe(
        (res) => {
          if (res.status == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: res.message,
            });
            this.passwordForm.reset();
            this.showPasswordChangeForm = false;
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
      markAllAsTouched(this.passwordForm);
      this.messageService.add({
        severity: 'warning',
        summary: 'Cảnh báo',
        detail: 'Cần nhập đủ thông tin',
      });
    }
  }



  // // Submit form đổi mật khẩu
  // onSubmitPasswordChange() {
  //   if (this.passwordForm.invalid) {
  //     return;
  //   }

  //   // Xử lý thay đổi mật khẩu
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Thành công',
  //     detail: 'Mật khẩu đã được thay đổi'
  //   });

  //   // Reset form
  //   this.passwordForm.reset();
  //   this.showPasswordChangeForm = false;
  // }



}
