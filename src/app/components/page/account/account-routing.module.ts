import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAccountRequestComponent } from './list-account-request/list-account-request.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';

const routes: Routes = [
  {
    path:'account-request',
    component:ListAccountRequestComponent
  },
  {
    path:'assign-role',
    component:AssignPermissionComponent
  },
  {
    path:'role',
    loadChildren:()=>import('./role/role.module').then(m=>m.RoleModule)
  },
  {
    path:'permission',
    loadChildren:()=>import('./permission/permission.module').then(m=>m.PermissionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
