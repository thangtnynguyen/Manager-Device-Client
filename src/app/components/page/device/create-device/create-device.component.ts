import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { DeviceCategoryService } from 'src/app/core/services/device-category.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.css']
})
export class CreateDeviceComponent {

  isSubmitting: boolean = false;
  categories: any[] = [];
  @ViewChild('roomSelectorTemplate') roomSelectorTemplate!: TemplateRef<any>;
  modalRef!: BsModalRef;
  buildings: any[] = [];
  floors: any[] = [];
  displayRoomDialog: boolean = false; // Điều khiển hiển thị dialog
  deviceForm!: FormGroup;
  rooms: any[] = [];

  selectedRoomName!: string;
  searchParams = {
    name: '',
    floorId: '',
    buildingId: ''
  };

  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private deviceCategoryService: DeviceCategoryService,
    private deviceService: DeviceService,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      deviceCategoryId: [null, Validators.required],
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      selectedRoomName: ['', null],
      description: [''],
      roomId: [null],
      purchaseDate: ['', Validators.required],
      warrantyExpiryDate: ['', Validators.required]
    });

    this.loadBuildings();
    this.loadFloors();
    this.loadRooms();
    this.loadCategories();
  }

  onRoomSearchSubmit() {
    this.roomService.paging(this.searchParams).subscribe((data: any) => {
      this.rooms = data;
    });
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      this.imagePreview = URL.createObjectURL(file);
    } else {
      this.imagePreview = null;
    }
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

  loadCategories() {
    this.deviceCategoryService.paging({ pageIndex: 1, pageSize: 100 }).subscribe((res: any) => {
      this.categories = res.data.items;
    })
  }

  selectRoom(room: any) {
    // this.selectedRoomName = room.name;
    this.deviceForm.get('selectedRoomName')?.setValue(room.name);
    this.deviceForm.get('roomId')?.setValue(room.id);

    this.displayRoomDialog = false;
  }

  onSubmit() {
    if (this.isSubmitting) {
      return;
    }
    if (this.deviceForm.valid) {
      const request = this.deviceForm.value;
      this.isSubmitting = true;
      this.deviceService.create(request).subscribe(
        (res) => {
          if (res.status == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: res.message,
            });
            this.router.navigate(['/page/device/list'])
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
      markAllAsTouched(this.deviceForm);
      this.messageService.add({
        severity: 'warning',
        summary: 'Cảnh báo',
        detail: 'Cần nhập đủ thông tin',
      });
    }
  }





  validationMessages = {
    deviceCategoryId: [
      { type: 'required', message: 'Chọn loại thiết bị' }
    ],
    serialNumber: [
      { type: 'required', message: 'Số định danh không được để trống' }
    ],
    name: [
      { type: 'required', message: 'Tên thiết bị không được để trống' }
    ],
    purchaseDate: [
      { type: 'required', message: 'Ngày mua là bắt buộc' }
    ],
    warrantyExpiryDate: [
      { type: 'required', message: 'Ngày hết bảo hành là bắt buộc' }
    ]
  };
}
