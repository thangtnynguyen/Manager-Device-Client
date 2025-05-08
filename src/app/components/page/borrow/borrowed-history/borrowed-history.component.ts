import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BorrowRequestStatus } from 'src/app/core/enums/all.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { BorrowRequestService } from 'src/app/core/services/borrow-request.service';
import { ConfirmDialogComponent } from 'src/app/shared/shared/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-borrowed-history',
  templateUrl: './borrowed-history.component.html',
  styleUrls: ['./borrowed-history.component.css']
})
export class BorrowedHistoryComponent {

  baseImageUrl = environment.baseApiUrl;

  borrowRequestApproveds: any = [];
  borrowRequestRejecteds: any = [];
  borrowRequestReturneds: any = [];
  borrowRequestPendings: any = [];

  dialogMessage: any = '';

  user: any = {};

  @ViewChild(ConfirmDialogComponent)
  confirmDialogComponent!: ConfirmDialogComponent;

  constructor(private authService: AuthService, private borrowRequestService: BorrowRequestService, private messageService: MessageService,) {
    this.authService.userCurrent.subscribe((user: any) => {
      this.user = user;
    })
  }



  ngOnInit() {

    const requestApproved = {
      pageIndex: 1,
      pageSize: 100,
      userActionId: this.user.id,
      status: BorrowRequestStatus.Approved
    }
    const requestRejected = {
      pageIndex: 1,
      pageSize: 100,
      userActionId: this.user.id,
      status: BorrowRequestStatus.Rejected
    }
    const requestReturned = {
      pageIndex: 1,
      pageSize: 100,
      userActionId: this.user.id,
      status: BorrowRequestStatus.Returned
    }
    const requestPending = {
      pageIndex: 1,
      pageSize: 100,
      userActionId: this.user.id,
      status: BorrowRequestStatus.Pending
    }

    this.getBorrowRequestApproveds(requestApproved);
    this.getBorrowRequestRejecteds(requestRejected);
    this.getBorrowRequestReturneds(requestReturned);
    this.getBorrowRequestPendings(requestPending);

  }


  getBorrowRequestRejecteds(request: any) {
    this.borrowRequestService.paging(request).subscribe((res) => {
      this.borrowRequestRejecteds = res.data.items.map((item: any) => {
        return {
          ...item,
          statusLabel: this.getStatusLabel(item.status)
        }
      })
    })
  }

  getBorrowRequestReturneds(request: any) {
    this.borrowRequestService.paging(request).subscribe((res) => {
      this.borrowRequestReturneds = res.data.items.map((item: any) => {
        return {
          ...item,
          statusLabel: this.getStatusLabel(item.status)
        }
      })
    })
  }

  getBorrowRequestApproveds(request: any) {
    this.borrowRequestService.paging(request).subscribe((res) => {
      this.borrowRequestApproveds = res.data.items.map((item: any) => {
        return {
          ...item,
          statusLabel: this.getStatusLabel(item.status)
        }
      })
    })
  }

  getBorrowRequestPendings(request: any) {
    this.borrowRequestService.paging(request).subscribe((res) => {
      this.borrowRequestPendings = res.data.items.map((item: any) => {
        return {
          ...item,
          statusLabel: this.getStatusLabel(item.status)
        }
      })
    })
  }


  onReturn(borrowRequest: any): void {
    this.dialogMessage = `Bạn có muốn hoàn trả  thiết bị ${borrowRequest.deviceName}-seri:${borrowRequest.deviceSerialNumber}  đã mượn không?`;
    const request = {
      id: borrowRequest.id,
      status: BorrowRequestStatus.Returned,
    };
    this.confirmDialogComponent.showDialog(() => {
      this.borrowRequestService
        .updateStatus(request)
        .subscribe((res: any) => {
          if (res.status == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: res.message,
            });
            this.borrowRequestReturneds.unshift(this.borrowRequestApproveds.find(
              (acc: any) => acc.id == borrowRequest.id
            ));
            this.borrowRequestApproveds = this.borrowRequestApproveds.filter(
              (acc: any) => acc.id !== borrowRequest.id
            );
          }
          else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Thông báo',
              detail: res.message,
            });
          }
        });
    });
  }




  getStatusLabel(status: BorrowRequestStatus): string {
    switch (status) {
      case BorrowRequestStatus.Pending:
        return 'Chờ duyệt';
      case BorrowRequestStatus.Approved:
        return 'Đã duyệt';
      case BorrowRequestStatus.Rejected:
        return 'Từ chối';
      case BorrowRequestStatus.Returned:
        return 'Đã trả';
      default:
        return 'Không xác định';
    }
  }



}
