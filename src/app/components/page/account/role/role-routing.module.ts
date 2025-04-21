import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowRoleComponent } from './show-role/show-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { CreateRoleComponent } from './create-role/create-role.component';

const routes: Routes = [
  {
    path:'',
    component:ShowRoleComponent
  },
  {
    path:'create',
    component:CreateRoleComponent
  },
  {
    path:'detail/:id',
    component:DetailRoleComponent
  },
  {
    path:'edit/:id',
    component:EditRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
