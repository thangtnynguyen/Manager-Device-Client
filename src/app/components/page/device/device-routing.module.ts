import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeviceComponent } from './list-device/list-device.component';
import { CreateDeviceComponent } from './create-device/create-device.component';

const routes: Routes = [
  {
    path:'list',
    component:ListDeviceComponent
  },
  {
    path:'create',
    component:CreateDeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
