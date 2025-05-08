import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent {
  @Input() floor: any;
  @Output() roomSelected = new EventEmitter<any>();

  rooms: any[] = [];


  constructor(private roomService: RoomService) {

  }


  ngOnChanges() {
    if (this.floor) {
      const request = {
        floorId: this.floor.id,
        pageIndex: 1,
        pageSize: 50
      }
      this.getRooms(request);
    }
  }

  getRooms(request: any) {
    this.roomService.paging(request).subscribe((res: any) => {
      this.rooms = res.data.items.map((item: any) => {
        return {
          ...item,
          image: 'https://freenice.net/wp-content/uploads/2021/11/Hinh-anh-lop-hoc-cong-nghe-thong-tin.jpg'
        }
      })
    })
  }


  onRoomSelect(room: any) {
    this.roomSelected.emit(room);
  }
}
