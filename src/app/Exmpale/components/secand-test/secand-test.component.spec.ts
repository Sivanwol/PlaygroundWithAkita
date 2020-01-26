import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecandTestComponent } from './secand-test.component';

describe('SecandTestComponent', () => {
  let component: SecandTestComponent;
  let fixture: ComponentFixture<SecandTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecandTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecandTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
