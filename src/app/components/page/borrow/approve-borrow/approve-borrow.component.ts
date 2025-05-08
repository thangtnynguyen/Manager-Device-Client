// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-approve-borrow',
//   templateUrl: './approve-borrow.component.html',
//   styleUrls: ['./approve-borrow.component.css']
// })
// export class ApproveBorrowComponent {

// }

import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { BorrowRequestStatus } from 'src/app/core/enums/all.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { BorrowRequestService } from 'src/app/core/services/borrow-request.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-approve-borrow',
  templateUrl: './approve-borrow.component.html',
  styleUrls: ['./approve-borrow.component.css']
})
export class ApproveBorrowComponent {


  user: any;
  borrowRequests: any[] = [];
  selectedBorrowRequests: any[] = [];
  dialogMessage: any = '';
  //flag
  showAssign: boolean = false;
  //search
  paging: any = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: '',
    orderBy: '',
    totalRecords: 0,
    totalPages: 0,
  };
  config: any = {
    paging: pagingConfig.default,
    baseUrl: systemConfig.baseFileSystemUrl,
    perPageOptions: DEFAULT_PER_PAGE_OPTIONS,
    pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
  };
  queryParameters: any = {
    ...this.config.paging,
    keyWord: null,
    sortBy: null,
    orderBy: null,
  };
  borrowRequestStatus = BorrowRequestStatus;

  @ViewChild(ConfirmDialogComponent)
  confirmDialogComponent!: ConfirmDialogComponent;

  constructor(private router: Router, private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private borrowRequestService: BorrowRequestService,
    private userService: UserService

  ) {
    this.authService.userCurrent.subscribe(user => {
      this.user = user;
    })
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const request = {
        ...params,
        pageIndex: params['pageIndex']
          ? params['pageIndex']
          : this.config.paging.pageIndex,
        pageSize: params['pageSize']
          ? params['pageSize']
          : this.config.paging.pageSize
      };
      this.queryParameters = {
        ...params,
        keyWord: this.queryParameters.keyWord ? this.queryParameters.keyWord.trim() : null,
        sortBy: this.queryParameters.sortBy || null,
        orderBy: this.queryParameters.orderBy || null
      };
      this.getBorrowRequests(request);

    });
  }


  //get data
  getBorrowRequests(request: any) {
    this.borrowRequestService.paging(request).subscribe(res => {
      if (res) {
        this.borrowRequests = res.data.items.map((item: any) => {
          return {
            ...item,
            statusLabel: this.getStatusLabel(item.status)
          };
        });
        if (this.borrowRequests.length === 0) {
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = res.data;
        this.paging = paging;
        this.selectedBorrowRequests = [];
      }
    })
  }




  //search data
  onSearch() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        keyWord: this.queryParameters.keyWord ? this.queryParameters.keyWord.trim() : null,
        sortBy: this.queryParameters.sortBy || null,
        orderBy: this.queryParameters.orderBy || null
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  onPageChange(event: any) {
    this.paging.pageIndex = event.page + 1;
    this.paging.pageSize = event.rows;
    this.route.queryParams.subscribe((params) => {
      const request = {
        ...params,
        pageIndex: event.page + 1,
        pageSize: event.rows,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  onRefreshSearch() {
    this.queryParameters = {};
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        keyWord: null,
        sortBy: null,
        orderBy: null
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }



  //handle
  handleUpdateStatus(borrowRequest: any, status: any) {
    this.dialogMessage = `Bạn có muốn ${status === BorrowRequestStatus.Approved
      ? 'phê duyệt'
      : 'từ chối'
      } đơn yêu cầu mượn thiết bị ${borrowRequest.deviceName}-seri:${borrowRequest.deviceSerialNumber}  của sinh viên/giảng viên ${borrowRequest.userActionName} không?`;
    const params = {
      id: borrowRequest.id,
    };
    const request = {
      id: borrowRequest.id,
      status: status,
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
            this.borrowRequests.find(
              (acc) => acc.id == borrowRequest.id
            ).status = status;
            this.borrowRequests.find(
              (acc) => acc.id == borrowRequest.id
            ).statusLabel = this.getStatusLabel(status);
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
  // handleUpdateStatus(borrowRequest: any, status: any) {
  //   this.dialogMessage = `Bạn có muốn ${status === BorrowRequestStatus.Approved
  //     ? 'phê duyệt'
  //     : 'từ chối'
  //     } đơn yêu cầu mượn thiết bị ${borrowRequest.deviceName} của sinh viên/giảng viên ${borrowRequest.userActionName} không?`;
  //   const params = {
  //     id: borrowRequest.id,
  //   };
  //   const request = {
  //     id: borrowRequest.id,
  //     status: status,
  //   };
  //   this.confirmDialogComponent.showDialog(() => {
  //     this.borrowRequestService
  //       .updateStatus(request)
  //       .subscribe((res: any) => {
  //         if (res.status == true) {
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Thành công',
  //             detail: res.message,
  //           });
  //           this.borrowRequests.find(
  //             (acc) => acc.id == borrowRequest.id
  //           ).status = status;
  //           this.borrowRequests.find(
  //             (acc) => acc.id == borrowRequest.id
  //           ).statusLabel = this.getStatusLabel(status);
  //         }
  //       });
  //   });
  // }










  //data front end
  columns = [
    { field: 'deviceName', header: 'Tên Thiết Bị ', selected: true },
    { field: 'class', header: 'Lớp mượn', selected: true },
    { field: 'roomName', header: 'Phòng mượn', selected: true },
    { field: 'userActionName', header: 'Người mượn', selected: true },
    { field: 'requestDate', header: 'Ngày yêu cầu', selected: true },
    { field: 'borrowDate', header: 'Ngày mượn', selected: true },
    { field: 'dueDate', header: 'Ngày hẹn trả', selected: true },
    { field: 'status', header: 'Trạng Thái', selected: true },
    { field: 'description', header: 'Mô tả', selected: true },
    { field: 'action', header: 'Hành Động', selected: true }
  ];

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
