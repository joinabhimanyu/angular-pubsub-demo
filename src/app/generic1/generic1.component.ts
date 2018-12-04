import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { navMap } from '../app.config';
import * as _ from 'lodash';
import { AppService } from '../app.service';
import { IbukiService } from '../ibuki.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-generic1',
  templateUrl: './generic1.component.html',
  styleUrls: ['./generic1.component.scss']
})

export class Generic1Component implements OnInit, OnDestroy {
  pageName: string;
  pageObject: any;
  selectedOption: any;
  showTicks = true;
  thumbLabel = true;
  autoTicks = false;
  styleProgress: any;
  ddlCount: any[] = [];
  ddlYearsOption: any[] = [];
  ddlMonthOption: any[] = [];
  showTextBox = false;
  progress: any;
  private _tickInterval = 1;
  pagesVisited: any;
  private routeSubscription: any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService, private _sanitizer: DomSanitizer, private ibukiService: IbukiService) {
  }

  ngOnInit() {
    let qx = this.appService.get('qx');
    let carryBag = qx && qx.carry_bag && JSON.parse(qx.carry_bag);
    this.pagesVisited = this.appService.get('pagesVisited');
    this.pagesVisited = (this.pagesVisited) || (carryBag && carryBag.pages_visited);
    (this.pagesVisited) && (Array.isArray(this.pagesVisited)) || (this.pagesVisited = []);
    this.appService.set('pagesVisited', this.pagesVisited);
    this.routeSubscription = this.activatedRoute
      .params
      .subscribe(param => {
        if (param.pageName) {
          this.pageName = param.pageName;
        } else {
          this.pageName = 'q1a';
        }
        this.pageObject = navMap[this.pageName];
        this.showPage();
        this.pagesVisited = this.appService.get('pagesVisited');
        this.getPagesVisited(this.pageObject);
        qx = this.appService.get('qx');
        this.appService.set('pagesVisited', this.pagesVisited);
        carryBag = JSON.stringify({
          'pages_visited': this.pagesVisited
        });
        qx && (qx.carry_bag = carryBag);
        this.initQxStatus();
      });
  }
  initQxStatus() {
    const qx = this.appService.get('qx');
    this.appService.set('qx', {
      ...qx,
      status: 'started',
    });
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getPagesVisited = (obj) => {
    const pageObj: any = {};
    pageObj.pageName = this.pageName;
    pageObj.isAnswered = this.appService.checkPageEmptyOrNot(obj);
    const element = this.pagesVisited.filter(item => item.pageName === this.pageName);
    ((element.length === 0) && this.pagesVisited.push(pageObj)) || (element[0].isAnswered = pageObj.isAnswered);
  }

  showPage() {
    const welcomePage = this.appService.get('welcomePage');
    this.progress = (welcomePage && (welcomePage === 'welcomec') && (this.pageObject.abbProgress)) || this.pageObject.progress;
    this.styleProgress = this._sanitizer.bypassSecurityTrustStyle(`width:${this.progress}%`);
    const sub = this.pageObject.sub;
    const relapses = this.pageObject.relapses;
    const commonOptions = this.pageObject.commonOptions;
    const qx = this.appService.get('qx');
    const gender = qx && qx.gender.toLowerCase();
    this.pageObject.gender = gender || 'male';
    if (sub && commonOptions) {
      sub.forEach(x => {
        const toBeCloned = Object.assign([], x.options, commonOptions);
        if ((!x.options) || (x.options.length === 0)) {
          x.options = _.cloneDeep(toBeCloned);
        }
      });
    }
    this.ddlCount = relapses ? _.range(this.pageObject.sub2.answer) : 0;
    const d = new Date();
    let year = d.getFullYear();
    year = year + 1;
    const yrange = _.range(2012, year, 1);
    this.ddlYearsOption = yrange.sort((prev, next) => next - prev);
    this.ddlMonthOption = relapses && (this.pageObject.sub1.monthOptions);
  }

  change(event) {
    const sub = this.pageObject.sub;
    if (sub) {
      const index = +event.source.name;
      sub[index]
        .options
        .forEach(x => x.checked = false);
    }
    const relapses = this.pageObject.relapses;
    const selectOptions = this.pageObject.selectOptions;
    this.selectedOption = (relapses || selectOptions) ? event : event.value;
    this.selectedOption.checked = true;
    this.selectedOption.pageName = this.pageName;
    this.ddlCount = relapses ? _.range(event.value) : 0;
  }

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }

  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
}
