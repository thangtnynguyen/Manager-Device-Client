import { Component } from '@angular/core';

@Component({
  selector: 'app-building-selection',
  templateUrl: './building-selection.component.html',
  styleUrls: ['./building-selection.component.css']
})
export class BuildingSelectionComponent {
  step = 1; // Step 1: Chọn tòa nhà, Step 2: Chọn tầng, Step 3: Chọn phòng
  selectedBuilding: any;
  selectedFloor: any;
  selectedRoom: any;

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
  }

  devices = [
    { id: 1, name: 'Máy tính xách tay', quantity: 5, image: 'https://htmart.vn/images/blog/8/m%C3%A1y_chi%E1%BA%BFu_di_%C4%91%E1%BB%99ng_552c-10.png' },
    { id: 2, name: 'Máy chiếu', quantity: 2, image: 'https://htmart.vn/images/blog/8/m%C3%A1y_chi%E1%BA%BFu_di_%C4%91%E1%BB%99ng_552c-10.png' },
    { id: 3, name: 'Điện thoại', quantity: 3, image: 'https://htmart.vn/images/blog/8/m%C3%A1y_chi%E1%BA%BFu_di_%C4%91%E1%BB%99ng_552c-10.png' },
    // Thêm nhiều thiết bị ở đây
  ];
}
