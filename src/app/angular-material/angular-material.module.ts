import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatRadioModule, MatButtonModule, MatDialogModule, MatGridListModule,
  MatCheckboxModule, MatListModule, MatCardModule, MatSelectModule, MatSliderModule
} from '@angular/material';
@NgModule({
  imports: [
    MatSliderModule, MatCardModule, MatSelectModule,
    CommonModule, MatRadioModule, MatButtonModule,
    MatDialogModule, MatGridListModule, MatCheckboxModule, MatListModule
  ],
  exports: [
    MatSliderModule,
    MatCardModule, MatSelectModule,
    MatRadioModule, MatButtonModule,
    MatDialogModule, MatGridListModule, MatCheckboxModule, MatListModule
  ],
  declarations: []
})
export class AngularMaterialModule { }
