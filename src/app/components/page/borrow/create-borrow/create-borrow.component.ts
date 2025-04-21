import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-borrow',
  templateUrl: './create-borrow.component.html',
  styleUrls: ['./create-borrow.component.css']
})
export class CreateBorrowComponent implements OnInit {


  ngOnInit() {
  }

  searchText = '';
  borrowDate!: string;
  returnDate!: string;
  borrower!: string;
  borrowClass!: string;
  selectedDevice: any;

  devices = [
    { id: 1, name: 'Máy tính xách tay', description: 'Laptop dành cho lập trình', image: 'https://trungbac247.vn/mediacenter/media/images/2209/news/ava/phancungcobantrenmaytinh1-1614184775.jpg' },
    { id: 2, name: 'Máy chiếu', description: 'Máy chiếu 4K', image: 'https://trungbac247.vn/mediacenter/media/images/2209/news/ava/phancungcobantrenmaytinh1-1614184775.jpg' },
    { id: 3, name: 'Điện thoại', description: 'Điện thoại Android', image: 'https://trungbac247.vn/mediacenter/media/images/2209/news/ava/phancungcobantrenmaytinh1-1614184775.jpg' },
    // Thêm nhiều thiết bị ở đây
  ];

  get filteredDevices() {
    return this.devices.filter(device =>
      device.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectDevice(device: any) {
    if (this.selectedDevice && this.selectedDevice.id === device.id) {
      return; // Đã chọn rồi thì không làm gì thêm
    }
    this.selectedDevice = device;
  }

  submitForm() {
    if (!this.selectedDevice) {
      alert('Chưa chọn thiết bị!');
      return;
    }

    console.log('Form Submitted:', {
      device: this.selectedDevice,
      borrowDate: this.borrowDate,
      returnDate: this.returnDate,
      borrower: this.borrower,
      borrowClass: this.borrowClass,
    });
  }

}
