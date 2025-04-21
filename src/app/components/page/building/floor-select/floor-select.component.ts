import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-floor-select',
  templateUrl: './floor-select.component.html',
  styleUrls: ['./floor-select.component.css']
})
export class FloorSelectComponent {
  @Input() building: any;
  @Output() floorSelected = new EventEmitter<any>();

  floors: any[] = [];

  ngOnChanges() {
    if (this.building) {
      this.floors = [
        { id: 1, name: 'Tầng 1', image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-bright-classroom-corridor-of-shanghai-univer-picture_500497092.jpg' },
        { id: 2, name: 'Tầng 2', image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-bright-classroom-corridor-of-shanghai-univer-picture_500497092.jpg' },
        { id: 3, name: 'Tầng 3', image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-bright-classroom-corridor-of-shanghai-univer-picture_500497092.jpg' },
        { id: 4, name: 'Tầng 4', image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-bright-classroom-corridor-of-shanghai-univer-picture_500497092.jpg' },
        { id: 5, name: 'Tầng 5', image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-bright-classroom-corridor-of-shanghai-univer-picture_500497092.jpg' },
      ];
    }
  }

  onFloorSelect(floor: any) {
    this.floorSelected.emit(floor);
  }
}
