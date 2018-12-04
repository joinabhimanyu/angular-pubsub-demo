import { Injectable } from '@angular/core';
import { IbukiService } from './ibuki.service';
import { email, phone } from './app.config';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { navMap } from './app.config';
import { environment } from '../environments/environment';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  global: any = {};
  subject: Subject<any>;
  constructor(private ibukiService: IbukiService, private httpClient: HttpClient, private router: Router) {
    this.set('navMap', navMap);
  }

  initialize() {
    this.setUrlParams();
    this.ibukiService.init(environment.settings);
    if (this.get('isUnsubscribe')) {
      this.router.navigate(['unsubscribe'], { queryParams: { qx_code: this.get('qx_code') } });
    } else {
      this.ibukiService.httpGet('getPatientDetails', { qx_code: this.get('qx_code') }, true);
    }
  }

  getPostData(pageName) {
    const qx = this.get('qx') || '';
    const qx_code = this.get('qx_code') || '';
    const ret = {
      status: qx.status,
      qx_code: qx.qx_code || qx_code,
      carry_bag: qx.carry_bag,
      responses: qx.responses,
      last_updated_at: moment().format('YYYY-MM-DD kk:mm:ss'),
      current_page_name: pageName
    };
    return (ret);
  }

  getWelcomeData() {
    const data: any = {};
    const qx = this.get('qx');
    qx && (
      data.firstName = qx.first_name || ''
      , data.lastName = qx.last_name || ''
      , data.appDate = moment(qx.qx_appt_date, 'MM/DD/YYYY').format('MMMM D, YYYY')
      , data.clinicianName = qx.clinician_name || ''
      , data.email = email
      , data.phone = phone
      , data.edssScore = qx.edss_score
    );
    return (data);
  }

  getPatientConcerns() {
    const qx = this.get('qx');
    const responses = qx && (qx.responses) && JSON.parse(qx.responses);
    const ansOption = responses && navMap.q29.options.map(item => {
      return (item.checked) && (item.othertext ? item.text + ': ' + item.othertext : item.text);
    });
    return ansOption;
  }

  getRelapses() {
    const qx = this.get('qx');
    const responses = qx && (qx.responses) && JSON.parse(qx.responses);
    const respFilter1 = responses && responses.filter(x => x.qx_code === 'Q27.1');
    const respFilter = responses && responses.filter(x => x.qx_code === 'Q27.2');
    const value = respFilter1 && respFilter && (respFilter1.length > 0)
      && (respFilter1[0].answer_text_score)
      && (respFilter1[0].answer_text_score === 1)
      && (respFilter.length > 0) && respFilter[0].answer_text;
    return value;
  }

  setUrlParams() {
    let rawParams = top.location.search || top.location.hash;
    rawParams.includes('unsubscribe') || top.location.href.includes('unsubscribe')
      ? this.set('isUnsubscribe', true) : this.set('isUnsubscribe', false);
    rawParams = decodeURIComponent(rawParams);
    const urlArray = rawParams.slice(rawParams.indexOf('?') + 1).split('&');
    const urlObject: any = urlArray.reduce((prevValue, x, i) => {
      const elementArray = x && x.split('=');
      (elementArray.length > 1) && (prevValue[elementArray[0].trim()] = elementArray[1].replace(/^\s+|\s+$/g, ''));
      return (prevValue);
    }, {});
    Object.assign(this.global, urlObject);
    this.get('qx_code') || this.set('qx_code', '1111');
  }

  populateNavMap() {
    const qx = this.get('qx');
    const responses = (qx.responses) && JSON.parse(qx.responses);
    let respFilter: any;
    let pageObj: any;
    const carryBag = qx && qx.carry_bag && JSON.parse(qx.carry_bag);
    const pagesVisited = carryBag && carryBag.pages_visited;
    if (pagesVisited && Array.isArray(pagesVisited) && responses) {
      Object.keys(navMap).forEach(i => {
        pageObj = navMap[i];
        const sub = pageObj.sub;
        const commonOptions = pageObj.commonOptions;
        sub && commonOptions && sub.forEach(x => {
          const toBeCloned = Object.assign([], x.options, commonOptions);
          if ((!x.options) || (x.options.length === 0)) {
            x.options = _.cloneDeep(toBeCloned);
          }
        });
        switch (pageObj.type.toLowerCase()) {
          case 'radio':
          case 'scale':
            respFilter = responses.filter(x => x.qx_code === pageObj.name);
            if (respFilter && respFilter.length > 0) {
              this.updateRadioQx(respFilter[0], pageObj);
            }
            break;
          case 'table':
          case 'header':
            sub && sub.forEach(element => {
              respFilter = responses.filter(x => x.qx_code === element.name);
              if (respFilter && respFilter.length > 0) {
                this.updateTableQx(respFilter[0], element);
              }
            });
            break;
          case 'division':
            sub && sub.forEach(element => {
              respFilter = responses.filter(x => x.qx_code === element.name);
              if (respFilter && respFilter.length > 0) {
                this.updateRadioQx(respFilter[0], element);
              }
            });
            break;
          case 'selectoptions':
            sub && sub.forEach(element => {
              respFilter = responses.filter(x => x.qx_code === element.name);
              element.value = (respFilter && respFilter.length > 0) ? respFilter[0].answer_text : '';
            });
            break;
          case 'sub2':
            sub && sub.forEach(element => {
              respFilter = responses.filter(x => x.qx_code === element.name);
              if (respFilter && respFilter.length > 0) {
                this.updateTableQx(respFilter[0], element);
              }
            });
            (pageObj.sub2) && pageObj.sub2.forEach(element => {
              respFilter = responses.filter(x => x.qx_code === element.name);
              if (respFilter && respFilter.length > 0) {
                this.updateRadioQx(respFilter[0], element);
              }
            });
            break;
          case 'gender':
            respFilter = responses.filter(x => x.qx_code === pageObj.name);
            if (respFilter && respFilter.length > 0) {
              this.updateRadioQx(respFilter[0], pageObj);
            }
            if (qx.gender && (qx.gender.toLowerCase() === 'male')) {
              pageObj && (pageObj.male) && (pageObj.male.sub) && pageObj.male.sub.forEach(element => {
                respFilter = responses.filter(x => x.qx_code === element.name);
                if (respFilter && respFilter.length > 0) {
                  this.updateTableQx(respFilter[0], element);
                }
              });
            } else if (qx.gender && (qx.gender.toLowerCase() === 'female')) {
              pageObj && (pageObj.female) && (pageObj.female.sub) && pageObj.female.sub.forEach(element => {
                respFilter = responses.filter(x => x.qx_code === element.name);
                if (respFilter && respFilter.length > 0) {
                  this.updateTableQx(respFilter[0], element);
                }
              });
            }
            break;
          case 'patientconcerns':
            respFilter = responses.filter(x => x.qx_code === pageObj.name);
            let y = 0;
            if (respFilter && respFilter.length > 0) {
              respFilter[0].answer_text.forEach(item => {
                if (pageObj.options[y].textBox) {
                  item = item.split('^');
                  pageObj.options[y].checked = (item[0] === '1') ? true : false;
                  pageObj.options[y].othertext = item[1];
                } else {
                  pageObj.options[y].checked = (item === '1') ? true : false;
                }
                y++;
              });
            }
            break;
          case 'relapses':
            (pageObj.sub3) && pageObj.sub3.forEach(element => {
              respFilter = responses.filter(x => x.qx_code === element.name);
              if (respFilter && respFilter.length > 0) {
                this.updateRadioQx(respFilter[0], element);
              }
            });
            if ((pageObj.sub3) && (pageObj.sub3[0].answer) && pageObj.sub2) {
              respFilter = responses.filter(x => x.qx_code === pageObj.sub2.name);
              pageObj.sub2.answer = (respFilter && (respFilter.length > 0)) && respFilter[0].answer_text;
              (pageObj.sub1) && (pageObj.sub2.answer) && this.updateRelapsesSub1(pageObj.sub1, pageObj.sub2.answer, responses);
            }
            break;
        }
      });

      pagesVisited && Array.isArray(pagesVisited) && (pagesVisited.length > 0) && pagesVisited.forEach((element, index) => {
        (element.pageName !== 'q1a') && (pagesVisited[index - 1])
          && (navMap[element.pageName].jumpBack = pagesVisited[index - 1].pageName);
      });
      this.getLandingPage(pagesVisited);
    }

  }

  getLandingPage(pagesVisited) {
    let landingPage = '';
    const filterLandingPage = pagesVisited && (pagesVisited.length > 0) && pagesVisited.find(x => !x.isAnswered);
    landingPage = filterLandingPage && filterLandingPage.pageName;

    if (landingPage) {
      const index = pagesVisited.findIndex(x => x.pageName === landingPage);
      const tempPagesVisited = pagesVisited.slice(0, index + 1);
      this.set('pagesVisited', tempPagesVisited);
    } else {
      const length = pagesVisited && Array.isArray(pagesVisited) && pagesVisited.length;
      const pageName = length && pagesVisited[length - 1].pageName;

      landingPage = pageName && this.getJumpTo(navMap[pageName]);
      (landingPage === 'review') || (
        landingPage && (navMap[landingPage].jumpBack = pageName)
      );
    }
    this.set('landingPage', landingPage);

  }

  updateRadioQx(respFilter, pageObj) {
    pageObj.answer = pageObj.options.find(x => x.text === respFilter.answer_text);
  }

  updateRelapsesSub1(sub1, answer, responses) {
    const respFilter = responses.filter(x => x.qx_code === sub1.name);
    if (respFilter.length > 0) {
      for (let i = 0; i < respFilter[0].answer_text.length; i++) {
        if (respFilter[0].answer_text[i]) {
          const x = respFilter[0].answer_text[i].split('^');
          sub1.relapsesYear[i] = +x[0] || 0;
          sub1.relapsesMonth[i] = +x[1] || 0;
        }
      }
    }
  }

  updateTableQx(respFilter, item) {
    const answer_text = respFilter && respFilter.answer_text;
    const optionFilter: any = answer_text && item.options.filter(x => x.text === respFilter.answer_text);
    if (optionFilter && optionFilter.length > 0) {
      optionFilter[0].checked = true;
    }
  }

  get(id) {
    return (this.global[id]);
  }

  set(id, value) {
    this.global[id] = value;
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

  checkPageEmptyOrNot = (page) => {
    let isAnswered: any = false;
    switch (page.type.toLowerCase()) {
      case 'table':
      case 'header':
        (page.sub) && page.sub.forEach(element => {
          isAnswered = isAnswered || ((element.options) && ((element.options.filter(item => item.checked).length > 0) ? true : false));
        });
        break;
      case 'radio':
      case 'scale':
        isAnswered = (page.answer) ? true : false;
        break;
      case 'division':
        (page.sub) && page.sub.forEach(element => {
          isAnswered = isAnswered || ((element.answer) ? true : false);
        });
        break;
      case 'selectoptions':
        (page.sub) && page.sub.forEach(element => {
          isAnswered = isAnswered || ((element.value) ? true : false);
        });
        break;
      case 'sub2':
        (page.sub) && page.sub.forEach(element => {
          isAnswered = isAnswered || ((element.options) && ((element.options.filter(item => item.checked).length > 0) ? true : false));
        });
        isAnswered || ((page.sub2) && page.sub2.forEach(element => {
          isAnswered = isAnswered || (element.answer ? true : false);
        }));
        break;
      case 'gender':
        isAnswered = (page.answer) ? true : false;
        isAnswered || (page && (page.male) && (page.male.sub) && page.male.sub.forEach(element => {
          isAnswered = isAnswered || ((element.options) && ((element.options.filter(item => item.checked).length > 0) ? true : false));
        })
        );
        break;
      case 'patientconcerns':
        isAnswered = (page.options.filter(item => item.checked).length > 0);
        break;
      case 'relapses':
        isAnswered = (page.sub3[0].answer ? true : false);
        break;
    }
    return isAnswered;
  }
}
