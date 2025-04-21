import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraceRoutingModule } from './trace-routing.module';
import { TraceDeviceComponent } from './trace-device/trace-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TraceDeviceComponent
  ],
  imports: [
    CommonModule,
    TraceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TraceModule { }
