import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';


const routes: Routes = [
  {
    path: 'test/login',
    component: LoginComponent,
  },
  { path: "test/showcase", canActivate: [AuthGuard], component: LayoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustmersRoutingModule { }
