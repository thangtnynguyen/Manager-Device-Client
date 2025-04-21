import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrls: ['./detail-profile.component.css']
})
export class DetailProfileComponent {

  user = {
    name: 'Nguyễn Văn A',
    position: 'Lập trình viên',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
    code: 'NV12345',
    history: [
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
  };

}
