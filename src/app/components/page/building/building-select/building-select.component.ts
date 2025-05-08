import { Component, Output, EventEmitter } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-building-select',
  templateUrl: './building-select.component.html',
  styleUrls: ['./building-select.component.css']
})
export class BuildingSelectComponent {
  @Output() buildingSelected = new EventEmitter<any>();


  buildings:any=[];

  constructor(private roomService: RoomService) {

  }


  ngOnInit() {
    const request = {
      pageIndex: 1,
      pageSize: 20
    }
    this.getBuildings(request);
  }


  getBuildings(request: any) {
    this.roomService.pagingBuildings(request).subscribe((res: any) => {
      this.buildings = res.data.items.map((item: any) => {
        return {
          ...item,
          image: 'https://th.bing.com/th/id/OIP.bsks7b614PX-UfIKegovPAHaE7?rs=1&pid=ImgDetMain'
        }
      })
    })
  }



  onBuildingSelect(building: any) {
    this.buildingSelected.emit(building);
  }
}
