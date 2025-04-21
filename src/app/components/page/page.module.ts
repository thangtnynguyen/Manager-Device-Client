import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
