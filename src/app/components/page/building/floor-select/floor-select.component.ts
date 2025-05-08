import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-floor-select',
  templateUrl: './floor-select.component.html',
  styleUrls: ['./floor-select.component.css']
})
export class FloorSelectComponent {
  @Input() building: any;
  @Output() floorSelected = new EventEmitter<any>();

  floors: any[] = [];


  constructor(private roomService: RoomService) {

  }


  ngOnChanges() {
    if (this.building) {
      const request = {
        buildingId: this.building.id,
        pageIndex: 1,
        pageSize: 20
      }
      this.getFloors(request);
    }
  }

  getFloors(request: any) {
    this.roomService.pagingFloors(request).subscribe((res: any) => {
      this.floors = res.data.items.map((item: any) => {
        return {
          ...item,
          image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-bright-classroom-corridor-of-shanghai-univer-picture_500497092.jpg'
        }
      })
    })
  }

  onFloorSelect(floor: any) {
    this.floorSelected.emit(floor);
  }
}
