import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { IbukiService } from '../ibuki.service';
import { AppService } from '../app.service';
import { allMessages, reviewPageDelay } from '../app.config';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
  data: any = {};
  displaySection: any;
  isSubmitDisabled = true;
  presentResponses: any;
  relapses: any;
  subs: any;
  edssAndSymptoms: any = { symptoms: [] };
  timer: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private appService: AppService,
    private ibukiService: IbukiService) { }

  ngOnInit() {
    this.subs = this.ibukiService.filterOn('getPatientDetails').subscribe(d => {
      this.isSubmitDisabled = false;
      this.edssAndSymptoms.edss_score = d.data.edss_score;
      const symptoms = JSON.parse(d.data.symptoms);
      // symptoms && Array.isArray(symptoms) && (
      //   this.edssAndSymptoms.symptoms = symptoms.filter(x => x.score).map(y => y.title.concat(' (', y.score, ')'))
      // );
      if (symptoms && Object.prototype.toString.call(symptoms) === '[object Array]') {
        this.edssAndSymptoms.symptoms = symptoms.filter(x => x.score).map(y => `${y.title} (${y.score})`);
      }
      this.displaySection = welcomePage && (welcomePage === 'welcomeb' || welcomePage === 'welcomea') &&
        this.edssAndSymptoms.symptoms && this.edssAndSymptoms.symptoms.length > 0;
    });
    const sub1 = this.ibukiService.filterOn('postPatientData').subscribe(d => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.ibukiService.httpGet('getPatientDetails', { qx_code: this.appService.get('qx_code') });
      }, reviewPageDelay);
    });
    const sub2 = this.ibukiService.behFilterOn(allMessages.pageRouting).subscribe(d => {
      if (d && d.data && d.data.pageName && d.data.pageName === 'welcomeb') {
        this.ibukiService.httpGet('getPatientDetails', { qx_code: this.appService.get('qx_code') });
      }
    });
    this.data = this.appService.getWelcomeData();
    const welcomePage = this.appService.get('welcomePage');
    const temp = this.appService.getPatientConcerns();
    this.presentResponses = temp && temp.filter(x => x);
    this.relapses = this.appService.getRelapses();
    this.subs
      .add(sub1)
      .add(sub2);
  }

  previous() {
    this.router.navigate(['generic1', 'q29'], { queryParamsHandling: 'preserve' });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPopupComponent, {
      width: '350px',
      data: {
        header: '',
        pageContent: 'Are you ready to submit? You will not be able to go back and change your responses.',
        button1: 'Go Back',
        button2: 'Yes'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '1') {
        const postData = this.appService.getPostData('review');
        postData.status = 'completed';
        this.ibukiService.httpPost('postPatientData', postData);
        this
          .router
          .navigate(['thankyou']);
      }
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    clearTimeout(this.timer);
  }

}
