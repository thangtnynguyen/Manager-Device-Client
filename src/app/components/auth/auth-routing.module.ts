import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountRequestComponent } from './account-request/account-request.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'account/request',
    component:AccountRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
