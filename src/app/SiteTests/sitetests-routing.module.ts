import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookMainPageComponent } from './components/hp-test/compounents/book-main-page/book-main-page.component';


const routes: Routes = [
  { path: "test/showcase", component: BookMainPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteTestsRoutingModule { }
