import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { DeviceStatus } from 'src/app/core/enums/all.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.css']
})
export class ListDeviceComponent {

  user: any;
  devices: any[] = [];
  selectedDevices: any[] = [];
  dialogMessage: any = '';
  selectedDevice: any=null;

  //flag
  showAssign: boolean = false;
  showDialogViewDetail: boolean = false;

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

  editingDeviceId: number | null = null;
  deviceStatusOptions = [
    { label: 'Sẵn sàng sử dụng', value: DeviceStatus.Available },
    { label: 'Đang sử dụng', value: DeviceStatus.Using },
    { label: 'Đang được mượn', value: DeviceStatus.Borrowed },
    { label: 'Đang sửa chữa', value: DeviceStatus.UnderRepair },
    { label: 'Hỏng', value: DeviceStatus.Broken },
  ];

  @ViewChild(ConfirmDialogComponent)
  confirmDialogComponent!: ConfirmDialogComponent;

  constructor(private router: Router, private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private deviceService: DeviceService,
    private userService: UserService

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
      this.getDevices(request);

    });
  }


  //get data
  getDevices(request: any) {
    this.deviceService.paging(request).subscribe(res => {
      if (res) {
        this.devices = res.data.items.map((item: any) => {
          return {
            ...item,
            statusLabel: this.getStatusLabel(item.status)
          };
        });
        if (this.devices.length === 0) {
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = res.data;
        this.paging = paging;
        this.selectedDevices = [];
      }
    })
  }

  viewDeviceDetail(device: any) {
    this.selectedDevice = device;
    this.showDialogViewDetail = true;
  }


  toggleEditStatus(device: any) {
    this.editingDeviceId = device.id;
  }

  cancelEditStatus() {
    this.editingDeviceId = null;
  }

  confirmStatusUpdate(device: any) {
    // TODO: Gọi API cập nhật trạng thái tại đây
    console.log('Cập nhật thiết bị:', device.id, '->', device.status);
    this.editingDeviceId = null;
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


  //handle











  //data front end
  columns = [
    { field: 'name', header: 'Tên Thiết Bị ', selected: true },
    { field: 'deviceCategory', header: 'Loại Thiết Bị', selected: true },
    { field: 'serialNumber', header: 'Mã Định Danh ', selected: true },
    { field: 'description', header: 'Mô Tả', selected: true },
    { field: 'createdAt', header: 'Ngày Tạo', selected: true },
    { field: 'warrantyExpiryDate', header: 'Ngày Hết Hạn Bảo Hành', selected: true },
    { field: 'room', header: 'Phòng Đang Đặt', selected: true },
    { field: 'status', header: 'Trạng Thái', selected: true },
    { field: 'action', header: 'Hành Động', selected: true }
  ];

  getStatusLabel(status: DeviceStatus): string {
    switch (status) {
      case DeviceStatus.Available:
        return 'Sẵn sàng sử dụng';
      case DeviceStatus.Using:
        return 'Đang sử dụng';
      case DeviceStatus.Borrowed:
        return 'Đang được mượn';
      case DeviceStatus.UnderRepair:
        return 'Đang được sửa chữa';
      case DeviceStatus.Broken:
        return 'Hỏng, không thể sử dụng';
      default:
        return 'Không xác định';
    }
  }
}
