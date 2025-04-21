import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-building-select',
  templateUrl: './building-select.component.html',
  styleUrls: ['./building-select.component.css']
})
export class BuildingSelectComponent {
  @Output() buildingSelected = new EventEmitter<any>();

  buildings = [
    { id: 1, name: 'Tòa Nhà A', image: 'https://th.bing.com/th/id/OIP.bsks7b614PX-UfIKegovPAHaE7?rs=1&pid=ImgDetMain' },
    { id: 2, name: 'Tòa Nhà B', image: 'https://th.bing.com/th/id/OIP.bsks7b614PX-UfIKegovPAHaE7?rs=1&pid=ImgDetMain' },
    { id: 3, name: 'Tòa Nhà C', image: 'https://th.bing.com/th/id/OIP.bsks7b614PX-UfIKegovPAHaE7?rs=1&pid=ImgDetMain' }
  ];

  onBuildingSelect(building: any) {
    this.buildingSelected.emit(building);
  }
}
