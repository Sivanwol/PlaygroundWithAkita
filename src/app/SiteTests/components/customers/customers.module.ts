import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppMaterialModule } from "../../../Common/app.material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from './services/users.service';
import { UsersStore } from './store/users.store';
import { UserQuery } from './queries/users.query';

import { EllipsisModule } from 'ngx-ellipsis';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CustmersRoutingModule } from './custmers-routing.module';
@NgModule({
  declarations: [
    LoginComponent,
    ListComponent,
    CustomerFormComponent,
    SearchBarComponent,
    LayoutComponent
  ],
  providers: [UserService, UsersStore, UserQuery],
  entryComponents: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    CustmersRoutingModule,
    NgxSpinnerModule,
    EllipsisModule
  ]
})
export class CustomersModule {}
