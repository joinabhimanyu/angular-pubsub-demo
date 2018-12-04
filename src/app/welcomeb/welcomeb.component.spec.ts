import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomebComponent } from './welcomeb.component';

describe('WelcomebComponent', () => {
  let component: WelcomebComponent;
  let fixture: ComponentFixture<WelcomebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
