import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { ExmpaleModule } from './Exmpale/exmpale.module';
import { SiteTestsModule } from './SiteTests/sitetests.module';
import { AppMaterialModule } from './Common/app.material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { EllipsisModule } from 'ngx-ellipsis';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExmpaleModule,
    SiteTestsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    AppMaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    EllipsisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
