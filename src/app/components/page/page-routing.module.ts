import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path:'device',
    loadChildren:()=>import('./device/device.module').then(m=>m.DeviceModule)
  }
  ,
  {
    path:'category',
    loadChildren:()=>import('./category/category.module').then(m=>m.CategoryModule)
  }
  ,
  {
    path:'borrow',
    loadChildren:()=>import('./borrow/borrow.module').then(m=>m.BorrowModule)
  }
  ,
  {
    path:'building',
    loadChildren:()=>import('./building/building.module').then(m=>m.BuildingModule)
  }
  ,
  {
    path:'trace',
    loadChildren:()=>import('./trace/trace.module').then(m=>m.TraceModule)
  }
  ,
  {
    path:'profile',
    loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)
  }
  ,
  {
    path:'account',
    loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule)
  }
  ,
  {
    path:'dashboard',
    component:DashboardComponent
  }
  ,
  {
    path:'menu',
    component:MenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
