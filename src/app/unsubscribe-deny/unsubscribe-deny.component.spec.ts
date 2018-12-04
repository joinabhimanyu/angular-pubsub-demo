import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeDenyComponent } from './unsubscribe-deny.component';

describe('UnsubscribeDenyComponent', () => {
  let component: UnsubscribeDenyComponent;
  let fixture: ComponentFixture<UnsubscribeDenyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribeDenyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
