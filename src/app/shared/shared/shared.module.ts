import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageModule } from './validation-message/validation-message.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ToastModule
  ],
  exports: [
    ValidationMessageModule,
    ConfirmDialogComponent,
    ToastModule
  ],
})
export class SharedModule { }
