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
	employees: any[] = [];
	selectedEmployees: any[] = [];
	roles: any[] = [];
	selectedRoles: any[] = [];
	selectedRoleIds: any[] = [];
	rolesOfEmployee: any[] = [];
	selectedEmployeeId: any = 0;
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
		organizationId: null,
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
				organizationId: this.queryParameters.organization?.data || this.user.organization.id,
				keyWord: this.queryParameters.keyWord ? this.queryParameters.keyWord.trim() : null,
				sortBy: this.queryParameters.sortBy || null,
				orderBy: this.queryParameters.orderBy || null
			};
		});
		const requestRoles = {
			pageIndex: 1,
			pageSize: 10000
		}
		this.getRoles(requestRoles);
	}


	//get data
	getRoles(request: any) {
		this.roleService.paging(request).subscribe(res => {
			if (res.status == true) {
				this.roles = res.data.items;
				if (this.roles.length === 0) {
					this.paging.pageIndex = 1;
				}

				const { items, ...paging } = res.data;
				this.paging = paging;

				this.selectedRoles = [];
			}
		})
	}

	getRoleByEmployee(request: any) {
		this.roleService.getRoleByEmployee(request).subscribe(res => {
			if (res.status == true) {
				this.rolesOfEmployee = res.data;
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
				organizationId: this.queryParameters.organization?.data || this.user.organization.id,
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
				organizationId: this.user.organization.id,
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
	showAssignRoles(employeeId: any, accountStatus: any) {
		this.showAssign = true;
		const request = {
			employeeId: employeeId,
		}
		this.getRoleByEmployee(request);
		this.selectedEmployeeId = employeeId;
	}
	handleAssignRole() {
		const request = {
			employeeId: this.selectedEmployeeId,
			roleNames: this.roles
				.filter(item => this.selectedRoleIds.includes(item.id))
				.map(item => item.normalizedName),
		}
		this.userService.assignRolesToEmployee(request).subscribe(res => {
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
		{ field: 'name', header: 'Tên nhân viên', selected: true },
		{ field: 'position', header: 'Vị trí công việc', selected: true },
		{ field: 'staffTitle', header: 'Chức vụ', selected: true },
		{ field: 'phoneNumber', header: 'Số điện thoại', selected: true },
		{ field: 'personalEmail', header: 'Email', selected: true },
		{ field: 'accountStatus', header: 'Trạng thái tài khoản', selected: true },
		{ field: 'action', header: 'Hành động', selected: true }
	];


}





