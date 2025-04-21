import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/shared/layout/layout.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('../app/components/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'page',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    loadChildren: () => import('./components/page/page.module').then((m) => m.PageModule),
  },
  {
    path:'',
    redirectTo:'page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
