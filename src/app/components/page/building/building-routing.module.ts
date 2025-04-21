import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingSelectionComponent } from './building-selection/building-selection.component';

const routes: Routes = [
  {
    path:'select',
    component:BuildingSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule { }
