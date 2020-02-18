import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSelectComponent } from './stock-select.component';

describe('StockSelectComponent', () => {
  let component: StockSelectComponent;
  let fixture: ComponentFixture<StockSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
