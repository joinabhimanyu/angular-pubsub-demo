import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { Generic1Component } from './generic1/generic1.component';
import { WelcomeaComponent } from './welcomea/welcomea.component';
import { WelcomebComponent } from './welcomeb/welcomeb.component';
import { WelcomecComponent } from './welcomec/welcomec.component';
import { AppService } from './app.service';
import { IbukiService } from './ibuki.service';
import { ROUTES } from './app.routes';
import { FormsModule } from '@angular/forms';
import { NavigateComponent } from './navigate/navigate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewComponent } from './review/review.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { ThankYouComponent } from './thankyou/thankyou.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { UnsubscribeConfirmComponent } from './unsubscribe-confirm/unsubscribe-confirm.component';
import { UnsubscribeDenyComponent } from './unsubscribe-deny/unsubscribe-deny.component';
import { QuestionnaireClosedComponent } from './questionnaire-closed/questionnaire-closed.component';

@NgModule({
  declarations: [
    AppComponent,
    Generic1Component,
    WelcomeaComponent,
    WelcomebComponent,
    WelcomecComponent,
    NavigateComponent,
    ReviewComponent,
    UnsubscribeComponent,
    ModalPopupComponent,
    ThankYouComponent,
    UnsubscribeConfirmComponent,
    UnsubscribeDenyComponent,
    QuestionnaireClosedComponent
  ],
  imports: [
    BrowserModule
    , RouterModule.forRoot(ROUTES, { useHash: true })
    , AngularMaterialModule, FormsModule, BrowserAnimationsModule, HttpClientModule
  ],
  entryComponents: [ModalPopupComponent],
  providers: [AppService, IbukiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
