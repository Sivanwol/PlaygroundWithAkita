import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTestComponent , SecandTestComponent} from './components';


const routes: Routes = [
  { path: 'test/page1', component: MainTestComponent },
  { path: 'test/page2', component: SecandTestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExmpaleRoutingModule { }
