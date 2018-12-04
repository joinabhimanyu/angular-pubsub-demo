import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { IbukiService } from '../ibuki.service';
import { navMap } from '../app.config';
@Component({
  selector: 'app-welcomec',
  templateUrl: './welcomec.component.html',
  styleUrls: ['./welcomec.component.scss']
})
export class WelcomecComponent implements OnInit {
  data: any = {};
  constructor(public appService: AppService, private ibukiService: IbukiService, private router: Router, private ac: ActivatedRoute) { }

  ngOnInit() {
    const x = this.appService.get('qx') || this.ibukiService.behFilterOn('getPatientDetails').subscribe(d => {
      this.appService.set('qx', d.data);
      const y = x && x.unsubscribe();
    });
    this.data = this.appService.getWelcomeData();
  }
  next() {
    navMap['q27'].jumpBack = 'start';
    this.router.navigate(['generic1', 'q27'], { queryParamsHandling: 'preserve' });
  }
}
