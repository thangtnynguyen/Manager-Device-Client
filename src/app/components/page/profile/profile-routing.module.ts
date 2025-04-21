import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProfileComponent } from './detail-profile/detail-profile.component';

const routes: Routes = [
  {
    path:'detail',
    component:DetailProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
