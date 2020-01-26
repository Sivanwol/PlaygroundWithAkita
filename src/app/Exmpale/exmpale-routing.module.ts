import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTestComponent , SecandTestComponent} from './components';
import { AuthGuard } from '../SiteTests/components/customers/guards/auth.guard';


const routes: Routes = [
  { path: 'test/page1', canActivate: [AuthGuard], component: MainTestComponent },
  { path: 'test/page2', canActivate: [AuthGuard], component: SecandTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExmpaleRoutingModule { }
