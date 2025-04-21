import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowPermissionComponent } from './show-permission/show-permission.component';

const routes: Routes = [
  {
    path:'',
    component:ShowPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
