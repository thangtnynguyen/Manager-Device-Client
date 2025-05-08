import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { DeviceStatus } from 'src/app/core/enums/all.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { DeviceLogService } from 'src/app/core/services/device-log.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trace-device',
  templateUrl: './trace-device.component.html',
  styleUrls: ['./trace-device.component.css']
})
export class TraceDeviceComponent {

  baseImageUrl = environment.baseApiUrl;
  selectedDevice: any;
  devices: any = [];
  user: any;
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
    keyword: null,
    name: null,
    description: null,
    sortBy: null,
    orderBy: null,
  };
  constructor(private router: Router, private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private deviceLogService: DeviceLogService,
    private deviceService: DeviceService

  ) {
    this.authService.userCurrent.subscribe(user => {
      this.user = user;
    })
  }

  searchDevices() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        keyword: this.queryParameters.keyword ? this.queryParameters.keyword.trim() : undefined,
        pageSize: 20
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
      this.deviceService.paging(request).subscribe((res) => {
        this.devices = res.data.items;
      })
    });
  }

  selectDevice(device: any) {
    this.deviceService.getById({ id: device.id }).subscribe((res: any) => {
      this.selectedDevice = res.data;
      this.selectedDevice.statusLabel=this.getStatusLabel(res.data.status)
    })
    this.deviceLogService.getByDevice({ deviceId: device.id }).subscribe((res: any) => {
      {
        this.deviceLogs = res.data.items;
      }
    })
  }



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



