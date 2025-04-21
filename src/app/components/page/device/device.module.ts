import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { ListDeviceComponent } from './list-device/list-device.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListDeviceComponent,
    CreateDeviceComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DeviceModule { }
