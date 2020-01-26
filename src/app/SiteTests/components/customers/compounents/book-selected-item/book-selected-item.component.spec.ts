import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSelectedItemComponent } from './book-selected-item.component';

describe('BookSelectedItemComponent', () => {
  let component: BookSelectedItemComponent;
  let fixture: ComponentFixture<BookSelectedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSelectedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSelectedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
