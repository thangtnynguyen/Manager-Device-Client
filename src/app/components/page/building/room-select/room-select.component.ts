import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent {
  @Input() floor: any;
  @Output() roomSelected = new EventEmitter<any>();

  rooms: any[] = [];

  ngOnChanges() {
    if (this.floor) {
      this.rooms = [
        { id: 1, name: 'Phòng 101', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 2, name: 'Phòng 102', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 3, name: 'Phòng 103', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 4, name: 'Phòng 101', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 5, name: 'Phòng 102', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 6, name: 'Phòng 103', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 7, name: 'Phòng 101', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 8, name: 'Phòng 102', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' },
        { id: 9, name: 'Phòng 103', image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg' }
      ];
    }
  }

  onRoomSelect(room: any) {
    this.roomSelected.emit(room);
  }
}
