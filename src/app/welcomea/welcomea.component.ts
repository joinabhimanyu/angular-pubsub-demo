import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { IbukiService } from '../ibuki.service';

@Component({
  selector: 'app-welcomea',
  templateUrl: './welcomea.component.html',
  styleUrls: ['./welcomea.component.scss']
})
export class WelcomeaComponent implements OnInit {
  data: any = {};
  constructor(public appService: AppService, private ibukiService: IbukiService, private router: Router) { }

  ngOnInit() {
    const x = this.appService.get('qx') || this.ibukiService.behFilterOn('getPatientDetails').subscribe(d => {
      this.appService.set('qx', d.data);
      this.data = this.appService.getWelcomeData();
      x && x.unsubscribe();
    });
    this.data = this.appService.getWelcomeData();
  }

  next() {
    this.router.navigate(['generic1', 'q1a'],
      { queryParamsHandling: 'preserve' });
  }
}
