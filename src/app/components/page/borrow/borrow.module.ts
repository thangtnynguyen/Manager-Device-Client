import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { CreateBorrowComponent } from './create-borrow/create-borrow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBorrowComponent } from './list-borrow/list-borrow.component';
import { ApproveBorrowComponent } from './approve-borrow/approve-borrow.component';


@NgModule({
  declarations: [
    CreateBorrowComponent,
    ListBorrowComponent,
    ApproveBorrowComponent
  ],
  imports: [
    CommonModule,
    BorrowRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BorrowModule { }
