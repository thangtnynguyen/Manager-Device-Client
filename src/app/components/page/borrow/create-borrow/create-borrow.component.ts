import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { DeviceStatus } from 'src/app/core/enums/all.enum';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { BorrowRequestService } from 'src/app/core/services/borrow-request.service';
import { DeviceLogService } from 'src/app/core/services/device-log.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { RoomService } from 'src/app/core/services/room.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-borrow',
  templateUrl: './create-borrow.component.html',
  styleUrls: ['./create-borrow.component.css']
})
export class CreateBorrowComponent implements OnInit {

  isSubmitting: boolean = false;
  baseImageUrl = environment.baseApiUrl;
  selectedDevice: any;
  devices: any = [];
  user: any;
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


  searchParams = {
    name: '',
    floorId: '',
    buildingId: ''
  };

  buildings: any[] = [];
  floors: any[] = [];
  displayRoomDialog: boolean = false; // Điều khiển hiển thị dialog
  rooms: any[] = [];

  borrowForm!: FormGroup; // Form group cho form mượn
  validationMessages = {
    borrowDate: [
      { type: 'required', message: 'Ngày mượn không được để trống' }
    ],
    dueDate: [
      { type: 'required', message: 'Ngày trả không được để trống' }
    ],
    borrower: [
      { type: 'required', message: 'Người mượn không được để trống' }
    ],
    class: [
      { type: 'required', message: 'Lớp học mượn không được để trống' }
    ],
    roomName: [
      { type: 'required', message: 'Phòng mượn không được để trống' }
    ]
  };



  constructor(private router: Router, private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private deviceService: DeviceService,
    private borrowRequestService: BorrowRequestService,
    private fb: FormBuilder,
    private roomService: RoomService,


  ) {
    this.authService.userCurrent.subscribe(user => {
      this.user = user;
    })
  }



  ngOnInit(): void {
    this.borrowForm = this.fb.group({
      borrowDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      borrower: ['', Validators.required],
      class: ['', Validators.required],
      roomName: ['', Validators.required],
      roomId: [null, null],
      deviceId: [null, null],
      description: ['']
    });

    this.borrowForm.get('borrower')?.setValue(this.user.name);
    this.borrowForm.get('userActionId')?.setValue(this.user.id);
    this.loadBuildings();
    this.loadFloors();
    this.loadRooms();

  }



  loadBuildings() {
    this.roomService.pagingBuildings({ pageIndex: 1, pageSize: 100 }).subscribe((data: any) => {
      this.buildings = data;
    });
  }

  loadFloors() {
    this.roomService.pagingFloors({ pageIndex: 1, pageSize: 100 }).subscribe((data: any) => {
      this.floors = data;
    });
  }

  loadRooms() {
    this.roomService.paging({ pageIndex: 1, pageSize: 100 }).subscribe((res: any) => {
      this.rooms = res.data.items.map((item: any) => {
        return {
          image: 'https://th.bing.com/th/id/R.a80fd92c173c2443c920e9aa0f48fe7f?rik=qUL0PIES1wwC8Q&riu=http%3a%2f%2ftuthucductri.edu.vn%2fmultidata%2fimg_2487.jpg&ehk=AeVMBsvB2EJNd7tbf0cPg61gr6WUP0VVaEwTotYl7XE%3d&risl=&pid=ImgRaw&r=0',
          ...item
        }
      });
    });
  }


  selectRoom(room: any) {
    this.borrowForm.get('roomName')?.setValue(room.name);
    this.borrowForm.get('roomId')?.setValue(room.id);

    this.displayRoomDialog = false;
  }

  onRoomSearchSubmit() {
    this.roomService.paging(this.searchParams).subscribe((data: any) => {
      this.rooms = data;
    });
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
    this.borrowForm.get('deviceId')?.setValue(device.id);
    this.deviceService.getById({ id: device.id }).subscribe((res: any) => {
      this.selectedDevice = res.data;
      this.selectedDevice.statusLabel = this.getStatusLabel(res.data.status)
    })
  }





  // Xử lý form submit
 onSubmit() {
     if (this.isSubmitting) {
       return;
     }
     if (this.borrowForm.valid) {
       const request = this.borrowForm.value;
       this.isSubmitting = true;
       this.borrowRequestService.create(request).subscribe(
         (res) => {
           if (res.status == true) {
             this.messageService.add({
               severity: 'success',
               summary: 'Thành công',
               detail: res.message,
             });
             this.router.navigate(['/page/borrow/list'])
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
             detail: 'Lỗi hệ thống: -------',
           });
           this.isSubmitting = false;
 
         },
         () => {
           this.isSubmitting = false;
         })
     }
     else {
       markAllAsTouched(this.borrowForm);
       this.messageService.add({
         severity: 'warning',
         summary: 'Cảnh báo',
         detail: 'Cần nhập đủ thông tin',
       });
     }
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
