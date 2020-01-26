import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppMaterialModule } from "../../../Common/app.material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BookSearchBarComponent } from "./compounents/book-search-bar/book-search-bar.component";
import { BookMainPageComponent } from "./compounents/book-main-page/book-main-page.component";
import { BookListComponent } from "./compounents/book-list/book-list.component";
import { BookListItemComponent } from "./compounents/book-list-item/book-list-item.component";
import { BookSelectedItemComponent } from "./compounents/book-selected-item/book-selected-item.component";
import { BookService } from './services/book.service';
import { BookStore } from './store/book.store';
import { BookQuery } from './queries/book.query';

import { EllipsisModule } from 'ngx-ellipsis';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    BookSearchBarComponent,
    BookMainPageComponent,
    BookListComponent,
    BookListItemComponent,
    BookSelectedItemComponent
  ],
  providers: [BookService, BookStore, BookQuery],
  entryComponents: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgxSpinnerModule,
    EllipsisModule
  ]
})
export class CustomersModule {}
