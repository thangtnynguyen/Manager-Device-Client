import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { CreateBorrowComponent } from './create-borrow/create-borrow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBorrowComponent } from './list-borrow/list-borrow.component';
import { ApproveBorrowComponent } from './approve-borrow/approve-borrow.component';





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
import { TabViewModule } from 'primeng/tabview';

import { MultiSelectModule } from 'primeng/multiselect';
import { BorrowedHistoryComponent } from './borrowed-history/borrowed-history.component';

@NgModule({
  declarations: [
    CreateBorrowComponent,
    ListBorrowComponent,
    ApproveBorrowComponent,
    BorrowedHistoryComponent
  ],
  imports: [
    CommonModule,
    BorrowRoutingModule,
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
        TabViewModule
  ]
})
export class BorrowModule { }
