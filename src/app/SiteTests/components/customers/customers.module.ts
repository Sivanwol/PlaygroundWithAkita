import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppMaterialModule } from "../../../Common/app.material.module";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { PanelModule } from "primeng/panel";
import { DataViewModule } from "primeng/dataview";
import { PaginatorModule } from "primeng/paginator";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { CheckboxModule } from "primeng/checkbox";
import { ToastModule } from "primeng/toast";
import { PanelMenuModule } from "primeng/panelmenu";
import { ListboxModule } from "primeng/listbox";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import {KeyFilterModule} from 'primeng/keyfilter';
import { DialogModule } from "primeng/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./services/users.service";
import { UsersStore } from "./store/users.store";
import { UserQuery } from "./queries/users.query";
import { EllipsisModule } from "ngx-ellipsis";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from "./components/login/login.component";
import { ListComponent } from "./components/list/list.component";
import { CustomerFormComponent } from "./components/customer-form/customer-form.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { CustmersRoutingModule } from "./custmers-routing.module";
import { CustmerSelectComponent } from "./components/custmer-select/custmer-select.component";
import { StockSelectComponent } from "./components/stock-select/stock-select.component";
import { StockListComponent } from "./components/stock-list/stock-list.component";
import { StockBarComponent } from "./components/stock-bar/stock-bar.component";
import { CustomerService } from "./services/customer.service";
import { CustomerStore } from "./store/customer.store";
import { CustomerQuery } from "./queries/customer.query";
import { StockService } from './services/stock.service';
import { StockStore } from './store/stock.store';
import { StockQuery } from './queries/stock.query';
@NgModule({
  declarations: [
    LoginComponent,
    ListComponent,
    CustomerFormComponent,
    StockBarComponent,
    StockListComponent,
    LayoutComponent,
    CustmerSelectComponent,
    StockSelectComponent
  ],
  providers: [
    UserService,
    UsersStore,
    UserQuery,
    CustomerService,
    CustomerStore,
    CustomerQuery,
    StockService,
    StockStore,
    StockQuery
  ],
  entryComponents: [CustomerFormComponent],
  imports: [
    CommonModule,
    ScrollPanelModule,
    PanelModule,
    DataViewModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    KeyFilterModule,
    ButtonModule,
    ListboxModule,
    PanelMenuModule,
    DynamicDialogModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    AppMaterialModule,
    CustmersRoutingModule,
    NgxSpinnerModule,
    EllipsisModule
  ]
})
export class CustomersModule {}
