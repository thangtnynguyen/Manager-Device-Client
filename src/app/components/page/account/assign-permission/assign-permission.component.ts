import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
	selector: 'app-show-permission',
	templateUrl: './assign-permission.component.html',
	styleUrls: ['./assign-permission.component.css']
  })
export class AssignPermissionComponent implements OnInit {

	user: any;
	users: any[] = [];
	selectedUsers: any[] = [];
	roles: any[] = [];
	selectedRoles: any[] = [];
	selectedRoleIds: any[] = [];
	rolesOfUser: any[] = [];
	selectedUserId: any = 0;
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
	constructor(private router: Router, private datePipe: DatePipe,
		private route: ActivatedRoute,
		private authService: AuthService,
		private messageService: MessageService,
		private roleService: RoleService,
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
			this.getUsers(request);

		});
		const requestRoles = {
			pageIndex: 1,
			pageSize: 10000
		}
		this.getRoles(requestRoles);
	}


	//get data
	getUsers(request: any) {
		this.userService.paging(request).subscribe(res => {
			if (res) {
				this.users = res.data.items;
				if (this.users.length === 0) {
					this.paging.pageIndex = 1;
					this.users=[];
				}

				const { items, ...paging } = res.data;
				this.paging = paging;

				this.selectedUsers = [];
			}
		})
	}
	getRoles(request: any) {
		this.roleService.paging(request).subscribe(res => {
			if (res.status == true) {
				this.roles = res.data.items;
				if (this.roles.length === 0) {
					this.paging.pageIndex = 1;
				}

				const { items, ...paging } = res.data;
				// this.paging = paging;

				this.selectedRoles = [];
			}
		})
	}

	getRoleByUser(request: any) {
		this.roleService.getRoleByUser(request).subscribe(res => {
			if (res.status == true) {
				this.rolesOfUser = res.data;
				this.selectedRoles = res.data;
				this.selectedRoleIds = res.data.map((item:any) => item.id);
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

	//send data
	showAssignRoles(userId: any, accountStatus: any) {
		this.showAssign = true;
		const request = {
			userId: userId,
		}
		this.getRoleByUser(request);
		this.selectedUserId = userId;
	}
	handleAssignRole() {
		const request = {
			userId: this.selectedUserId,
			roleNames: this.roles
				.filter(item => this.selectedRoleIds.includes(item.id))
				.map(item => item.normalizedName),
		}
		this.userService.assignRolesToUser(request).subscribe(res => {
			if (res.status == true) {
				this.messageService.add({
					severity: 'success',
					summary: 'Thành công',
					detail: res.message,
				});
				this.router.navigate(['/decentralization/assign-permission'])
			}
			else {
				this.messageService.add({
					severity: 'error',
					summary: 'Thất bại',
					detail: res.message,
				});
			}
			this.showAssign = false;
			this.selectedRoleIds = [];
		});
		// console.log("request",request);
	}



	//data front end
	columns = [
		{ field: 'name', header: 'Tên Tài Khoản', selected: true },
		{ field: 'phoneNumber', header: 'Số Điện Thoại', selected: true },
		{ field: 'email', header: 'Email', selected: true },
		{ field: 'code', header: 'Mã Sinh Viên/Giảng Viên', selected: true },
		{ field: 'position', header: 'Chức Vụ', selected: true },
		{ field: 'accountStatus', header: 'Trạng Thái Tài Khoản', selected: true },
		{ field: 'action', header: 'Hành Động', selected: true }
	];


}





