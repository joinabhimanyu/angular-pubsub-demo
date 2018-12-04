import { Component, OnInit, Input } from '@angular/core';
import { navMap, sutterHealthUrl, allMessages } from '../app.config';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalPopupComponent } from '../modal-popup/modal-popup.component';
import { IbukiService } from '../ibuki.service';
import { filter } from 'rxjs/operators';

const selectOptionsMapping = {
  '0%': 0,
  '10%': 1,
  '20%': 2,
  '30%': 3,
  '40%': 4,
  '50%': 5,
  '60%': 6,
  '70%': 7,
  '80%': 8,
  '90%': 9,
  '100%': 10
};

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})

export class NavigateComponent implements OnInit {
  @Input() selectedOption: any;
  @Input() pageName: string;
  pageObject: any;
  responses: any;
  lastAnsweredPage: any;
  firstEmptyPage: any;
  pagesVisited: any;
  constructor(private appService: AppService, private router: Router,
    private location: Location, public dialog: MatDialog, private ibukiService: IbukiService) { }

  ngOnInit() {
    let qx = this.appService.get('qx');
    qx || (qx = {});
    this.appService.set('qx', qx);
    qx.responses || (qx.responses = '[]');
    this.responses = JSON.parse(qx.responses);
    (this.responses) || (this.responses = []);
    this.pagesVisited = this.appService.get('pagesVisited');
    (this.pagesVisited) && (Array.isArray(this.pagesVisited)) || (this.pagesVisited = []);
  }

  next() {
    this.pageObject = navMap[this.pageName];
    let jumpTo;
    if (this.pageObject.type === 'selectOptions') {
      jumpTo = ((this.pageObject.sub[0].value)
        && (this.pageObject.sub[1].value)
        && (this.pageObject.sub[2].value)
        && (this.pageObject.sub[3].value)) ? (jumpTo = this.pageObject.sub[0].jumpTo) : (jumpTo = this.pageObject.jumpTo);
    } else {
      ((this.pageObject.answer) && (this.pageObject.answer.jumpTo)
        && (jumpTo = this.pageObject.answer.jumpTo)) || (jumpTo = this.pageObject.jumpTo);
    }
    (jumpTo === 'review') || (
      navMap[jumpTo].jumpBack = this.pageName
    );
    this.saveData(this.pageObject);
    (jumpTo === 'review')
      ? this.router.navigate(['review'], { queryParamsHandling: 'preserve' })
      : this.router.navigate(['generic1', jumpTo], { queryParamsHandling: 'preserve' });
    this.ibukiService.behEmit(allMessages.pageRouting, null);
  }
  getPagesVisited = (obj: any, qx: any): string => {
    let status = qx.status;
    this.pagesVisited = this.appService.get('pagesVisited');
    const pageObj: any = {};
    pageObj.pageName = this.pageName;
    pageObj.isAnswered = this.appService.checkPageEmptyOrNot(obj);
    status || (pageObj.isAnswered && (status = 'started'));
    const element = this.pagesVisited.filter(item => item.pageName === this.pageName);
    ((element.length === 0) && this.pagesVisited.push(pageObj)) || (element[0].isAnswered = pageObj.isAnswered);
    return status;
  }
  previous() {
    this.pageObject = navMap[this.pageName];
    const jumpBack = this.pageObject.jumpBack;
    this.pagesVisited = this.appService.get('pagesVisited');
    (jumpBack === 'start') || this.pagesVisited.pop();
    this.appService.set('pagesVisited', this.pagesVisited);
    (jumpBack === 'start') || (this.router
      .navigate(['generic1', jumpBack], { queryParamsHandling: 'preserve' }));

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalPopupComponent, {
      width: '350px',
      data: {
        header: '',
        pageContent: `Your answers have been saved and will be shared with your clinician. To continue the questionnaire,
      use the hyperlink in the email invitation.`,
        button1: 'Close',
        button2: 'Continue'
      }
    });
    this.pageObject = navMap[this.pageName];
    this.saveData(this.pageObject);
    dialogRef.afterClosed().subscribe(result => {
      if (result === '0') {
        window.location.href = sutterHealthUrl;
      }
    });
  }

  saveData(obj) {
    const qx = this.appService.get('qx');
    const status = this.getPagesVisited(obj, qx);
    const sub = obj.sub;
    switch (obj.type.toLowerCase()) {
      case 'radio':
      case 'scale':
        this.prepareRadioQx(obj);
        break;
      case 'table':
      case 'header':
        sub && sub.forEach(element => {
          this.prepareTableQx(element);
        });
        break;
      case 'division':
        sub && sub.forEach(element => {
          this.prepareRadioQx(element);
        });
        break;
      case 'selectoptions':
        sub && sub.forEach(element => {
          this.prepareSelectOptionQx(element, obj.selectOptions);
        });
        break;
      case 'sub2':
        sub && sub.forEach(element => {
          this.prepareTableQx(element);
        });
        (obj.sub2) && obj.sub2.forEach(element => {
          this.prepareRadioQx(element);
        });
        break;
      case 'gender':
        this.prepareRadioQx(obj);
        if (qx.gender && (qx.gender.toLowerCase() === 'male')) {
          obj && (obj.male) && (obj.male.sub) && obj.male.sub.forEach(element => {
            this.prepareTableQx(element);
          });
        } else if (qx.gender && (qx.gender.toLowerCase() === 'female')) {
          obj && (obj.female) && (obj.female.sub) && obj.female.sub.forEach(element => {
            this.prepareTableQx(element);
          });
        }
        break;
      case 'patientconcerns':
        this.preparePatientConcerns(obj);
        break;
      case 'relapses':
        (obj.sub3) && obj.sub3.forEach(element => {
          this.prepareRadioQx(element);
        });
        const iHadRelapses = obj.sub3[0].answer.score > 0;
        (obj.sub2) && this.prepareRelapce1(obj.sub2, iHadRelapses);
        (obj.sub2) && (obj.sub1) && this.prepareRelapce2(obj.sub1, obj.sub2.answer, iHadRelapses);
        break;
    }
    this.appService.set('qx', {
      ...qx,
      responses: JSON.stringify(this.responses),
      status: status,
      pagesVisited: this.pagesVisited,
      carry_bag: JSON.stringify({
        'pages_visited': this.pagesVisited
      })
    });
    this.ibukiService.httpPost('postPatientData', this.appService.getPostData(this.pageName));
  }

  prepareRelapce1 = (qxObj, iHadRelapses) => {
    const filter1: any = this.responses.filter(item => item.qx_code === qxObj.name);
    if (filter1.length === 1) {
      filter1[0].answer_text = qxObj.answer;
    } else if (iHadRelapses) {
      const temp: any = {};
      temp.qx_code = qxObj.name;
      temp.qx_text = qxObj.text;
      temp.answer_options = (qxObj.selectOption);
      temp.answer_text = qxObj.answer;
      temp.qx_global_text = '';
      temp.edss = qxObj.edss || 'no';
      this.responses.push(temp);
    }
  }

  prepareRelapce2 = (qxObj, value, iHadRelapses) => {
    const answer_text = [];
    if (value) {
      for (let i = 0; i < value; i++) {
        let answer = '';
        answer = (qxObj.relapsesYear[i]) ? qxObj.relapsesYear[i] : '';
        answer = answer + '^' + ((qxObj.relapsesMonth[i]) ? qxObj.relapsesMonth[i] : '');
        answer_text.push(answer);
      }
    }
    const filter1: any = this.responses.filter(item => item.qx_code === qxObj.name);
    if (filter1.length === 1) {
      filter1[0].answer_text = answer_text;
    } else if (iHadRelapses) {
      const temp: any = {};
      temp.qx_code = qxObj.name;
      temp.qx_text = qxObj.text;
      temp.answer_options = (qxObj.answer_options);
      temp.answer_text = answer_text;
      temp.qx_global_text = '';
      temp.edss = qxObj.edss || 'no';
      this.responses.push(temp);
    }
  }

  preparePatientConcerns = (qxObj) => {
    const filter1: any = this.responses.filter(item => item.qx_code === qxObj.name);
    if (filter1.length === 1) {
      filter1[0].answer_text = (qxObj.options) && qxObj.options.map(item => {
        return item.checked ? (item.othertext ? '1^' + item.othertext : '1') : '0';
      });
    } else {
      const temp: any = {};
      temp.qx_code = qxObj.name;
      temp.qx_text = qxObj.text;
      temp.answer_options = (qxObj.options) && qxObj.options.map(x => x.text);
      temp.answer_text = qxObj.options.map(item => {
        return item.checked ? (item.othertext ? '1^' + item.othertext : '1') : '0';
      });
      temp.qx_global_text = '';
      temp.edss = qxObj.edss || 'no';
      this.responses.push(temp);
    }
  }

  prepareRadioQx = (qxObj) => {
    qxObj.answer || (qxObj.answer = { text: '', score: 0 });
    const elementInResponses = this.responses.find(x => x.qx_code === qxObj.name);
    if (elementInResponses) {
      if (elementInResponses.answer_text_score !== qxObj.answer.score) { // score changed
        if (qxObj.deleteItems) {
          this.responses = this.responses.filter(x => {
            const z = qxObj.deleteItems.find(y => x.qx_code === y);
            return (z === undefined);
          });
        }
        // elementInResponses.answer_text = (qxObj.answer) && (qxObj.answer.text) && qxObj.answer.text;
        // elementInResponses.answer_text_score = ((qxObj.answer) && (qxObj.answer.score) && qxObj.answer.score) || 0;
      }
      elementInResponses.answer_text = (qxObj.answer) && (qxObj.answer.text) && qxObj.answer.text;
      elementInResponses.answer_text_score = ((qxObj.answer) && (qxObj.answer.score) && qxObj.answer.score) || 0;
    } else {
      const temp: any = {};
      temp.qx_code = qxObj.name;
      temp.qx_text = qxObj.text;
      temp.answer_options = (qxObj.options) && qxObj.options.map(x => x.text);
      temp.answer_options_score = (qxObj.options) && qxObj.options.map(x => x.score || 0);
      temp.answer_text = (qxObj.answer) && (qxObj.answer.text) && qxObj.answer.text;
      temp.answer_text_score = ((qxObj.answer) && (qxObj.answer.score) && qxObj.answer.score) || 0;
      temp.qx_global_text = '';
      temp.edss = qxObj.edss || 'yes';
      this.responses.push(temp);
    }
  }

  prepareTableQx = (qxObj) => {
    const filter1: any = (this.responses) && this.responses.filter(item => item.qx_code === qxObj.name);
    if (filter1 && (filter1.length === 1)) {
      if (qxObj.options.filter(item => item.checked).length > 0) {
        filter1[0].answer_text = qxObj.options.filter(item => item.checked)[0].text;
        filter1[0].answer_text_score = qxObj.options.filter(item => item.checked)[0].score;
      } else {
        filter1[0].answer_text = '';
        filter1[0].answer_text_score = 0;
      }
    } else {
      const temp: any = {};
      temp.qx_code = qxObj.name;
      temp.qx_text = qxObj.text;
      temp.answer_options = (qxObj.options) && qxObj.options.map(item => item.text);
      temp.answer_options_score = (qxObj.options) && qxObj.options.map(x => x.score || 0);
      if (qxObj.options.filter(item => item.checked).length > 0) {
        temp.answer_text = qxObj.options.filter(item => item.checked)[0].text;
        temp.answer_text_score = qxObj.options.filter(item => item.checked)[0].score;
      } else {
        temp.answer_text = '';
        temp.answer_text_score = 0;
      }
      temp.qx_global_text = '';
      temp.edss = qxObj.edss || 'yes';
      this.responses.push(temp);
    }
  }

  prepareSelectOptionQx = (qxObj, selectOptions) => {
    const filter1: any = (this.responses) && this.responses.filter(item => item.qx_code === qxObj.name);
    if (filter1 && (filter1.length === 1)) {
      filter1[0].answer_text = qxObj.value;
      filter1[0].answer_text_score = selectOptionsMapping[qxObj.value];
    } else {
      const temp: any = {};
      temp.qx_code = qxObj.name;
      temp.qx_text = qxObj.text;
      temp.answer_options = selectOptions;
      temp.answer_options_score = selectOptions.map((item) => selectOptionsMapping[item]);
      temp.answer_text = qxObj.value;
      temp.answer_text_score = selectOptionsMapping[qxObj.value];
      temp.qx_global_text = '';
      temp.edss = qxObj.edss || 'no';
      this.responses.push(temp);
    }
  }

  getJumpTo = (obj) => {
    let jumpTo: any;
    if (obj.type === 'selectOptions') {
      jumpTo = ((obj.sub[0].value)
        && (obj.sub[1].value)
        && (obj.sub[2].value)
        && (obj.sub[3].value)) ? (jumpTo = obj.sub[0].jumpTo) : (jumpTo = obj.jumpTo);
    } else {
      ((obj.answer) && (obj.answer.jumpTo)
        && (jumpTo = obj.answer.jumpTo)) || (jumpTo = obj.jumpTo);
    }
    return jumpTo;
  }

  getLastAnsweredPage = (lastAnsweredPage, obj) => {
    const isAnswered = this.appService.checkPageEmptyOrNot(obj);
    return isAnswered ? (
      (lastAnsweredPage) ? ((obj.weight > navMap[lastAnsweredPage].weight ? this.pageName : lastAnsweredPage)) : this.pageName
    ) : lastAnsweredPage;
  }
}
