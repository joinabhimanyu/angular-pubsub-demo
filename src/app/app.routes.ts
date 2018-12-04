import { RouterModule, Routes } from '@angular/router';
import { WelcomeaComponent } from './welcomea/welcomea.component';
import { WelcomebComponent } from './welcomeb/welcomeb.component';
import { WelcomecComponent } from './welcomec/welcomec.component';
import { Generic1Component } from './generic1/generic1.component';
import { ReviewComponent } from './review/review.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { ThankYouComponent } from './thankyou/thankyou.component';
import { UnsubscribeConfirmComponent } from './unsubscribe-confirm/unsubscribe-confirm.component';
import { UnsubscribeDenyComponent } from './unsubscribe-deny/unsubscribe-deny.component';
import { QuestionnaireClosedComponent } from './questionnaire-closed/questionnaire-closed.component';

export const ROUTES: Routes = [
  {
    path: 'welcomea',
    component: WelcomeaComponent
  },
  {
    path: 'welcomeb',
    component: WelcomebComponent
  },
  {
    path: 'welcomec',
    component: WelcomecComponent
  },
  {
    path: 'generic1/:pageName', pathMatch: 'full',
    component: Generic1Component
  },
  {
    path: 'review', pathMatch: 'full',
    component: ReviewComponent
  },
  {
    path: 'unsubscribe', pathMatch: 'full',
    component: UnsubscribeComponent
  },
  {
    path: 'thankyou', pathMatch: 'full',
    component: ThankYouComponent
  },
  {
    path: 'confirm', pathMatch: 'full',
    component: UnsubscribeConfirmComponent
  },
  {
    path: 'deny', pathMatch: 'full',
    component: UnsubscribeDenyComponent
  },
  {
    path: 'generic1/',
    component: Generic1Component,
    pathMatch: 'full'
  },
  {
    path: 'questionnaireclosed', pathMatch: 'full',
    component: QuestionnaireClosedComponent
  }
];
