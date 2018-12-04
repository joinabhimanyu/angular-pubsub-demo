import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeaComponent } from './welcomea.component';

describe('WelcomeaComponent', () => {
  let component: WelcomeaComponent;
  let fixture: ComponentFixture<WelcomeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
