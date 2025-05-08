import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { AccountRequestStatus } from 'src/app/core/enums/all.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { AccountRequestService } from 'src/app/core/services/account-request.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-account-request',
  templateUrl: './list-account-request.component.html',
  styleUrls: ['./list-account-request.component.css']
})
export class ListAccountRequestComponent {

  user: any;
  accountRequests: any[] = [];
  selectedAccountRequests: any[] = [];
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

  @ViewChild(ConfirmDialogComponent)
  confirmDialogComponent!: ConfirmDialogComponent;

  constructor(private router: Router, private datePipe: DatePipe,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private accountRequestService: AccountRequestService,
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
      this.getAccountRequests(request);

    });
  }


  //get data
  getAccountRequests(request: any) {
    this.accountRequestService.paging(request).subscribe(res => {
      if (res) {
        // this.accountRequests = res.data.items;
        this.accountRequests = res.data.items.map((item: any) => {
          return {
            ...item,
            statusLabel: this.getStatusLabel(item.status)
          };
        });

        if (this.accountRequests.length === 0) {
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = res.data;
        this.paging = paging;
        this.selectedAccountRequests = [];
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
  handleUpdateStatus(accountRequest: any, status: any) {
    this.dialogMessage = `Bạn có muốn ${status === AccountRequestStatus.Approved
      ? 'phê duyệt'
      : 'từ chối'
      } đơn yêu cầu cấp tài khoản của sinh viên/giảng viên ${accountRequest.name} không?`;
    const params = {
      id: accountRequest.id,
    };
    const request = {
      id: accountRequest.id,
      status: status,
    };
    this.confirmDialogComponent.showDialog(() => {
      this.accountRequestService
        .updateStatus(request)
        .subscribe((res: any) => {
          if (res.status == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: res.message,
            });
            this.accountRequests.find(
              (acc) => acc.id == accountRequest.id
            ).status = status;
            this.accountRequests.find(
              (acc) => acc.id == accountRequest.id
            ).statusLabel = this.getStatusLabel(status);
          }
        });
    });
  }











  //data front end
  columns = [
    { field: 'name', header: 'Tên Sinh Viên/Giảng viên ', selected: true },
    { field: 'code', header: 'Mã ', selected: true },
    { field: 'email', header: 'Email', selected: true },
    { field: 'phone', header: 'Số Điện Thoại', selected: true },
    { field: 'classCode', header: 'Mã Lớp', selected: true },
    { field: 'position', header: 'Chức Vụ', selected: true },
    { field: 'reason', header: 'Lý Do', selected: true },
    { field: 'date', header: 'Ngày Yêu Cầu', selected: true },
    { field: 'status', header: 'Trạng Thái', selected: true },
    { field: 'action', header: 'Hành Động', selected: true }
  ];

  getStatusLabel(status: AccountRequestStatus): string {
    switch (status) {
      case AccountRequestStatus.Pending:
        return 'Chưa cấp';
      case AccountRequestStatus.Approved:
        return 'Đã cấp';
      case AccountRequestStatus.Rejected:
        return 'Đã từ chối';
      default:
        return 'Không xác định';
    }
  }


}
