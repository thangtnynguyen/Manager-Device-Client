import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';

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
import { FormsModule } from '@angular/forms';
import { ShowPermissionComponent } from './show-permission/show-permission.component';


@NgModule({
  declarations: [ShowPermissionComponent],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    CheckboxModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    DropdownModule,
    ToolbarModule,
    BreadcrumbModule,
    TreeSelectModule,
    DialogModule,
    FormsModule,
    AutoCompleteModule,
    SharedModule,
    CalendarModule,
    InputTextareaModule,
    AccordionModule,
    TableModule
  ]
})
export class PermissionModule { }
