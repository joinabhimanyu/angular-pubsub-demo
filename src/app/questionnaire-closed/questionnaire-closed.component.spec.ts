import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireClosedComponent } from './questionnaire-closed.component';

describe('ThankYouComponent', () => {
  let component: QuestionnaireClosedComponent;
  let fixture: ComponentFixture<QuestionnaireClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireClosedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
