import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraceDeviceComponent } from './trace-device/trace-device.component';

const routes: Routes = [
  {
    path:'',
    component:TraceDeviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraceRoutingModule { }
