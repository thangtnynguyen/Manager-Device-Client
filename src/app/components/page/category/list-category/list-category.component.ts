import { DatePipe } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { AccountRequestService } from 'src/app/core/services/account-request.service';
import { DeviceCategoryService } from 'src/app/core/services/device-category.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/shared/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {

  baseImageUrl = environment.baseApiUrl;
  user: any;
  deviceCategories: any[] = [];
  selectedDeviceCategories: any[] = [];
  dialogMessage: any = '';
  //flag
  showAssign: boolean = false;
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

  @ViewChild(ConfirmDialogComponent)
  confirmDialogComponent!: ConfirmDialogComponent;

  constructor(private router: Router, private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private deviceCategoryService: DeviceCategoryService

  ) {
    this.authService.userCurrent.subscribe(user => {
      this.user = user;
    })
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const request = {
        ...params,
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
      this.getDeviceCategories(request);

    });
    this.deviceCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });
  }


  //get data
  getDeviceCategories(request: any) {
    this.deviceCategoryService.paging(request).subscribe(res => {
      if (res) {
        this.deviceCategories = res.data.items;
        if (this.deviceCategories.length === 0) {
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = res.data;
        this.paging = paging;
        this.selectedDeviceCategories = [];
      }
    })
  }




  //search data
  onSearch() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        keyWord: this.queryParameters.keyWord ? this.queryParameters.keyWord.trim() : null,
        sortBy: this.queryParameters.sortBy || null,
        orderBy: this.queryParameters.orderBy || null
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  onPageChange(event: any) {
    this.paging.pageIndex = event.page + 1;
    this.paging.pageSize = event.rows;
    this.route.queryParams.subscribe((params) => {
      const request = {
        ...params,
        pageIndex: event.page + 1,
        pageSize: event.rows,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  onRefreshSearch() {
    this.queryParameters = {};
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        keyWord: null,
        sortBy: null,
        orderBy: null
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }


  deviceCategoryForm!: FormGroup;
  displayDialog: boolean = false;
  imagePreview: string | null = null;
  imageError: boolean = false;
  imageFile: File | null = null;

  validationMessages = {
    name: [
      { type: 'required', message: 'Tên danh mục không được để trống' }
    ],
    description: [
      { type: 'required', message: 'Mô tả không được để trống' }
    ],
    image: [
      { type: 'required', message: 'Vui lòng chọn ảnh hợp lệ' }
    ]
  };



  // Hàm xử lý khi chọn ảnh
  onFileChange(event: any): void {
    console.log(event);
    if (event && event.currentFiles && event.currentFiles[0]) {
      const file = event.currentFiles[0];
      if (file && file.type.startsWith('image')) {
        this.imagePreview = URL.createObjectURL(file);
        this.imageError = false;
        this.deviceCategoryForm.patchValue({ image: file });
        this.imageFile = file;
      } else {
        this.imageError = true;
      }
    }
    else {
      this.imageError = true;
      this.imageFile = null;
    }
  }

  // Hàm xử lý submit
  onSubmit(): void {
    if (this.deviceCategoryForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.deviceCategoryForm.value.name);
    formData.append('description', this.deviceCategoryForm.value.description);
    if (this.imageFile) {
      formData.append('ImageFile', this.imageFile);
    }
    this.deviceCategoryService.create(formData).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Tạo danh mục thiết bị thành công'
        });
        this.deviceCategoryForm.reset();
        this.displayDialog = false;
        this.getDeviceCategories({ pageIndex: 1, pageSize: 10 });
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Có lỗi xảy ra, vui lòng thử lại'
        });
      }
    );
  }

  handleDelete(id: any) {

  }



  //data front end
  columns = [
    { field: 'name', header: 'Tên Loại/Hình Ảnh ', selected: true },
    { field: 'description', header: 'Mô tả', selected: true },
    { field: 'date', header: 'Ngày Tạo', selected: true },
    { field: 'action', header: 'Hành Động', selected: true }
  ];
}
