import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IbukiService } from '../ibuki.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit {

  constructor(private router: Router, private ibukiService: IbukiService, private appService: AppService) { }
  ngOnInit() {
  }
  deny() {
    this
      .router
      .navigate(['deny']);
  }
  unsubscribe() {
    this.ibukiService.httpGet('unsubscribe', null, false, { qx_code: this.appService.get('qx_code') });
    this
      .router
      .navigate(['confirm']);
  }
}
