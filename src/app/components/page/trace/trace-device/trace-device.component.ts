import { Component } from '@angular/core';

@Component({
  selector: 'app-trace-device',
  templateUrl: './trace-device.component.html',
  styleUrls: ['./trace-device.component.css']
})
export class TraceDeviceComponent {

  searchText = '';
  selectedDevice: any;
  devices = [
    {
      id: 1,
      name: 'Máy tính xách tay',
      image: 'https://binhminhdigital.com/StoreData/images/PageData/top-5-may-anh-tot-nhat-de-chup-anh-su-kien-Binhminhdigital(2).jpg',
      description: 'Laptop dành cho lập trình',
      usageHistory: [
        { date: '2023-04-10', description: 'Được sử dụng cho lớp học lập trình.' },
        { date: '2023-04-12', description: 'Được sử dụng trong hội thảo công nghệ.' }
      ]
    },
    {
      id: 2,
      name: 'Máy chiếu',
      image: 'https://binhminhdigital.com/StoreData/images/PageData/top-5-may-anh-tot-nhat-de-chup-anh-su-kien-Binhminhdigital(2).jpg',
      description: 'Máy chiếu 4K, dùng trong giảng dạy.',
      usageHistory: [
        { date: '2023-04-11', description: 'Được sử dụng trong lớp học toán.' }
      ]
    },
    {
      id: 3,
      name: 'Điện thoại',
      image: 'https://binhminhdigital.com/StoreData/images/PageData/top-5-may-anh-tot-nhat-de-chup-anh-su-kien-Binhminhdigital(2).jpg',
      description: 'Điện thoại Android, dùng cho sinh viên.',
      usageHistory: [
        { date: '2023-04-09', description: 'Được sử dụng trong lớp học điện tử.' }
      ]
    }
    // Thêm nhiều thiết bị khác ở đây
  ];

  filteredDevices = [...this.devices]; // Mặc định hiển thị tất cả thiết bị

  // Khi người dùng tìm kiếm, lọc danh sách thiết bị
  filterDevices() {
    if (this.searchText) {
      this.filteredDevices = this.devices.filter(device =>
        device.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredDevices = [...this.devices];
    }
  }

  // Khi người dùng chọn thiết bị, hiển thị thông tin chi tiết
  selectDevice(device: any) {
    this.selectedDevice = device;
  }
}
