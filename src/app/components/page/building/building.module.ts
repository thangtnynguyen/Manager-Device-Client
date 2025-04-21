import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { BuildingSelectionComponent } from './building-selection/building-selection.component';
import { BuildingSelectComponent } from './building-select/building-select.component';
import { FloorSelectComponent } from './floor-select/floor-select.component';
import { RoomSelectComponent } from './room-select/room-select.component';


@NgModule({
  declarations: [
    BuildingSelectionComponent,
    BuildingSelectComponent,
    FloorSelectComponent,
    RoomSelectComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule
  ]
})
export class BuildingModule { }
