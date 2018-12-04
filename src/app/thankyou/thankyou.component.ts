import { Component, OnInit } from '@angular/core';
import { sutterHealthUrl } from '../app.config';
@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankYouComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close() {
    window.location.href = sutterHealthUrl;
  }

}
