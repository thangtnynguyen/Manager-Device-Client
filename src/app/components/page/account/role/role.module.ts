import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
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
import { CreateRoleComponent } from './create-role/create-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ShowRoleComponent } from './show-role/show-role.component';

@NgModule({
  declarations: [CreateRoleComponent,DetailRoleComponent,EditRoleComponent,ShowRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
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
    FormsModule,
    AutoCompleteModule,
    SharedModule,
    CalendarModule,
    InputTextareaModule,
    AccordionModule
  ]
})
export class RoleModule { }
