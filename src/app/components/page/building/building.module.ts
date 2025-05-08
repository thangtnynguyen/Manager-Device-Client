import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { BuildingSelectionComponent } from './building-selection/building-selection.component';
import { BuildingSelectComponent } from './building-select/building-select.component';
import { FloorSelectComponent } from './floor-select/floor-select.component';
import { RoomSelectComponent } from './room-select/room-select.component';


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






@NgModule({
  declarations: [
    BuildingSelectionComponent,
    BuildingSelectComponent,
    FloorSelectComponent,
    RoomSelectComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
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
  ]
})
export class BuildingModule { }
