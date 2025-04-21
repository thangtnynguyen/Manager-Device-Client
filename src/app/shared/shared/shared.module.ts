import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageModule } from './validation-message/validation-message.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    ValidationMessageModule,
    ConfirmDialogComponent
  ],
})
export class SharedModule { }
