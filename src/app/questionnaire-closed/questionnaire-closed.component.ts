import { Component, OnInit } from '@angular/core';
import { sutterHealthUrl } from '../app.config';
@Component({
  selector: 'app-questionnaire-closed',
  templateUrl: './questionnaire-closed.component.html',
  styleUrls: ['./questionnaire-closed.component.scss']
})
export class QuestionnaireClosedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close() {
    window.location.href = sutterHealthUrl;
  }

}
