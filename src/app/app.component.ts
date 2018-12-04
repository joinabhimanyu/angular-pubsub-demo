import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { IbukiService } from './ibuki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'neuroshare-questionnaire';
  sub: any = {};
  constructor(private appService: AppService, private ibukiService: IbukiService, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.ibukiService.behFilterOn('getPatientDetails').subscribe(d => {
      this.appService.set('qx', d.data);
      const welcomePage = this.getWelcomePage();
      this.appService.set('welcomePage', welcomePage);
      if (welcomePage === 'welcomeb') { this.appService.populateNavMap(); }
      this.router.navigate([welcomePage], { queryParams: { qx_code: this.appService.get('qx_code') } });
    });
    this.appService.initialize();
  }

  isWithin90Days(dt) {
    let ret = false;
    const today = moment();
    if (dt) {
      const thatDate = moment(dt);
      const diff = today.diff(thatDate, 'days');
      (diff <= 90) ? ret = true : ret = false;
    }
    return (ret);
  }

  getWelcomePage() {
    const qx = this.appService.get('qx');
    let welcomePage = '';
    const qx_completed_at = qx.qx_completed_at;
    const qx_type = (qx.qx_type.toLowerCase() === 'full');
    const status = (qx.status === 'started');
    let { qx_appt_date, qx_appt_time } = qx;
    qx_appt_date = moment(qx_appt_date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    qx_appt_time || (qx_appt_time = `${moment().hours()}:${moment().seconds()}:${moment().milliseconds()}`);
    const appt_date = moment(`${qx_appt_date} ${qx_appt_time}`, 'MM/DD/YYYY HH:mm:ss');
    if (moment().diff(appt_date) > 0) {
      welcomePage = 'questionnaireclosed';
    } else {
      if (qx_completed_at) {
        welcomePage = 'thankyou';
      } else {
        if (qx_type) {
          status ? (welcomePage = 'welcomeb') : (welcomePage = 'welcomea');
        } else {
          welcomePage = 'welcomec';
        }
      }
    }
    return (welcomePage);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
