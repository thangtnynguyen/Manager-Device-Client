import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBorrowComponent } from './create-borrow/create-borrow.component';
import { ListBorrowComponent } from './list-borrow/list-borrow.component';
import { ApproveBorrowComponent } from './approve-borrow/approve-borrow.component';
import { BorrowedHistoryComponent } from './borrowed-history/borrowed-history.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateBorrowComponent
  },
  {
    path: 'list',
    component: ListBorrowComponent
  },
  {
    path: 'approve',
    component: ApproveBorrowComponent
  },
  {
    path:'borrowed-history',
    component:BorrowedHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowRoutingModule { }
