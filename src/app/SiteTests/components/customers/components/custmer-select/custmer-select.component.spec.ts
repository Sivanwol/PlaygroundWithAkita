import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmerSelectComponent } from './custmer-select.component';

describe('CustmerSelectComponent', () => {
  let component: CustmerSelectComponent;
  let fixture: ComponentFixture<CustmerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustmerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustmerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
