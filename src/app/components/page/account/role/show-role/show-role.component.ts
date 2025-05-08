import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import pagingConfig, { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_PER_PAGE_OPTIONS } from 'src/app/core/configs/paging.config';
import systemConfig from 'src/app/core/configs/system.config';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { RoleService } from 'src/app/core/services/role.service';


@Component({
	selector: 'app-show-role',
	templateUrl: './show-role.component.html',
	styleUrls: ['./show-role.component.css']
  })
export class ShowRoleComponent implements OnInit {
	//var 
	user: any;
	roles:any[]=[];
	selectedRoles:any[]=[];
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
		name: null,
		description: null,
		sortBy: null,
		orderBy: null,
	};
	constructor(private router: Router, private datePipe: DatePipe,
		private route: ActivatedRoute,
		private authService: AuthService,
		private messageService: MessageService,
		private roleService: RoleService

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
				name: this.queryParameters.name ? this.queryParameters.name.trim() : null,
				description: this.queryParameters.description ? this.queryParameters.description : null,
				sortBy: this.queryParameters.sortBy || null,
				orderBy: this.queryParameters.orderBy || null
			};
			this.getRoles(request);
		});
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
	//search data
	onSearch() {
		this.route.queryParams.subscribe(params => {
			const request = {
				...params,
				name: this.queryParameters.name ? this.queryParameters.name.trim() : null,
				description: this.queryParameters.description ? this.queryParameters.description : null,
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
		this.route.queryParams.subscribe(params => {
			const request = {
				...params,
				name: null,
				description: null,
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

	//handle data
	handleDelete(role:any){

	}

	onAdd(){
		this.router.navigate(['/page/account/role/create'])
	}

	
	//data front end
	columns = [
		{ field: 'name', header: 'Tên quyền hạn', selected: true },
		{ field: 'description', header: 'Mô tả', selected: true },
		{ field: 'action', header: 'Hành động', selected: true }
	];

	expandState = {};


}
