import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateService } from "./services";
import { StateStore } from "./store";
import { StateQuery } from "./queries";
import {
  MainTestComponent,
  SecandTestComponent,
  StateFormComponent
} from "./components";
import { ExmpaleRoutingModule } from "./exmpale-routing.module";
import { AppMaterialModule } from "../Common/app.material.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainTestComponent, SecandTestComponent, StateFormComponent],
  providers: [StateService, StateStore, StateQuery],
  entryComponents: [
    StateFormComponent
  ],
  imports: [CommonModule ,ExmpaleRoutingModule, ReactiveFormsModule, AppMaterialModule]
})
export class ExmpaleModule {}
