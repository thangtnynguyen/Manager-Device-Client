import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() message: string = "Bạn có chắc chắn muốn thực hiện hành động này không?";
  display: boolean = false;
  private onConfirmCallback!: () => void;

  showDialog(onConfirm: () => void) {
    this.onConfirmCallback = onConfirm; // Lưu trữ hàm callback
    this.display = true;
  }

  confirmAction() {
    if (this.onConfirmCallback) {
      this.onConfirmCallback(); // Gọi hàm callback
    }
    this.display = false;
  }

  cancelAction() {
    this.display = false;
  }
}