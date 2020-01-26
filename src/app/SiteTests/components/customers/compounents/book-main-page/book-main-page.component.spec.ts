import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMainPageComponent } from './book-main-page.component';

describe('BookMainPageComponent', () => {
  let component: BookMainPageComponent;
  let fixture: ComponentFixture<BookMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
