import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceRoutingModule } from './device-routing.module';
import { ListDeviceComponent } from './list-device/list-device.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'src/app/shared/shared/shared.module';

import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    ListDeviceComponent,
    CreateDeviceComponent
  ],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
        TableModule,
        CheckboxModule,
        ButtonModule,
        PaginatorModule,
        InputTextModule,
        DropdownModule,
        ToolbarModule,
        BreadcrumbModule,
        TreeSelectModule,
        DialogModule,
        AutoCompleteModule,
        SharedModule,
        CalendarModule,
        InputTextareaModule,
        AccordionModule,
        MultiSelectModule,
        FileUploadModule,
        ImageModule
  ]
})
export class DeviceModule { }
