import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Generic1Component } from './generic1.component';

describe('Generic1Component', () => {
  let component: Generic1Component;
  let fixture: ComponentFixture<Generic1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
