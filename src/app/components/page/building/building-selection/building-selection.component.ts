import { Component } from '@angular/core';
import { DeviceStatus } from 'src/app/core/enums/all.enum';
import { DeviceCategoryService } from 'src/app/core/services/device-category.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-building-selection',
  templateUrl: './building-selection.component.html',
  styleUrls: ['./building-selection.component.css']
})
export class BuildingSelectionComponent {

  baseImageUrl=environment.baseApiUrl;
  step = 1; // Step 1: Chọn tòa nhà, Step 2: Chọn tầng, Step 3: Chọn phòng
  selectedBuilding: any;
  selectedFloor: any;
  selectedRoom: any;
  deviceCategorySummaries: any = [];

  displayDialog = false;
  devices:any=[];

  constructor(private deviceCategoryService: DeviceCategoryService,private deviceService:DeviceService) {

  }

  showDetail(deviceCategory:any){
    this.displayDialog=true;
    const request={
      deviceCategoryId:deviceCategory.id,
      roomId:this.selectedRoom.id,
      pageIndex:1,
      pageSize:100
    }
    this.deviceService.paging(request).subscribe((res:any)=>{
      this.devices = res.data.items.map((item: any) => {
        return {
          ...item,
          statusLabel: this.getStatusLabel(item.status)
        };
      });
    })
  }





  // Khi tòa nhà được chọn
  onBuildingSelected(building: any) {
    this.selectedBuilding = building;
    this.step = 2; // Chuyển sang chọn tầng
  }

  // Khi tầng được chọn
  onFloorSelected(floor: any) {
    this.selectedFloor = floor;
    this.step = 3; // Chuyển sang chọn phòng
  }

  // Khi phòng học được chọn
  onRoomSelected(room: any) {
    this.selectedRoom = room;
    this.step = 4; // Hiển thị thông tin đã chọn
    const request = {
      roomId: room.id,
      pageIndex: 1,
      pageSize: 20
    }
    this.getDeviceCategorySummaries(request);
  }

  getDeviceCategorySummaries(request: any) {
    this.deviceCategoryService.getDeviceCategorySummaryByRoomPaging(request).subscribe((res: any) => {
      this.deviceCategorySummaries = res.data.items;
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
