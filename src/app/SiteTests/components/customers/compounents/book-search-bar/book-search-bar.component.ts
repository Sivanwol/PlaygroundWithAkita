import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { BookService } from "../../services/book.service";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-book-search-bar",
  templateUrl: "./book-search-bar.component.html",
  styleUrls: ["./book-search-bar.component.scss"]
})
export class BookSearchBarComponent implements OnInit {
  public form: FormGroup = null;

  constructor(private fb: FormBuilder,
              private bookService: BookService) { }


  ngOnInit() {
    this.initalForm();
  }
  initalForm() {
    this.form = this.fb.group({
      query: [
        "", [Validators.required, Validators.minLength(3)]
      ],
      onlyEbook: [false]
    });
    this.onChanges();
  }
  onChanges(): void {
    this.form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(val => {
      if (this.form.valid) {
        const {query, onlyEbook} = this.form.value;
        this.bookService.searchBooks(query, onlyEbook);
      }
    });
  }
}
