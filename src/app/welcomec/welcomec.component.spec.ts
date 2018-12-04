import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomecComponent } from './welcomec.component';

describe('WelcomecComponent', () => {
  let component: WelcomecComponent;
  let fixture: ComponentFixture<WelcomecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
