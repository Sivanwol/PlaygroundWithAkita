
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {SiteTestsRoutingModule} from "./sitetests-routing.module";
import { CustomersModule } from './components/customers/customers.module';
@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, CustomersModule, SiteTestsRoutingModule]
})

export class SiteTestsModule { }
