import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessageService, SelectItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { PermissionService } from 'src/app/core/services/permission.service';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
@Component({
	selector: 'app-edit-role',
	templateUrl: './edit-role.component.html',
	styleUrls: ['./edit-role.component.css']
  })
export class EditRoleComponent implements OnInit {
	//var
	breadcrumbs!: any[];
	user: any;
	permissions: any[] = [];
	selectedPermissions: any = [];
	isSubmitting: boolean = false;
	permissionId:number=0;
	constructor(private router: Router, private datePipe: DatePipe,
		private route: ActivatedRoute,
		private permissionService: PermissionService,
		private authService: AuthService,
		private messageService: MessageService,
		private roleService: RoleService,
		private fb: FormBuilder

	) {
		this.roleForm = this.fb.group({
			name: [null, Validators.required],
			description: [null]
		});
		this.authService.userCurrent.subscribe(user => {
			this.user = user;
		})
	}


	ngOnInit(): void {
		this.breadcrumbs = [
			{ label: 'Danh sách vai trò', routeLink: '/decentralization/role' },
			{ label: 'Thêm vai trò' },
		];

		this.route.paramMap.subscribe((params) => {
			const request = {
				id: params.get('id'),
			};
			this.permissionId=+!request.id;
			this.getPermission(request);
		});

		const request = {
			pageIndex: 1,
			pageSize: 10000,
		};
		this.getPermissions(request);
	}
	getPermissions(request: any) {
		this.permissionService.paging(request).subscribe(res => {
			if (res.status === true) {
				this.permissions = res.data.items.map((permission:any) => ({
					...permission,
					selected: this.selectedPermissions.some((selectedPermission:any) => selectedPermission.id == permission.id),
					childrens: permission.childrens?.map((child:any) => ({
						...child,
						selected: this.selectedPermissions.some((selectedPermission:any) => selectedPermission.id == child.id),
					}))
				}));
			}
		});
	}

	getPermission(request: any) {
		this.roleService.getById(request).subscribe(res => {
			if (res.status === true) {
				this.roleForm.get('name')?.setValue(res.data.name);
				this.roleForm.get('description')?.setValue(res.data.description);
				this.selectedPermissions = this.flattenPermissions(res.data.permissions);
			}
		});
	}



	//handle data
	onPermissionChange(permission: any): void {
		if (permission.childrens.length > 0 && permission.childrens != null) {
			permission.childrens.forEach((child: any) => {
				child.selected = permission.selected;
			});
		} else {
			const parent = this.permissions.find((p: any) => p.id == permission.parentPermissionId);
			if (parent) {
				// const allChildrenSelected = parent.childrens.every((child: any) => child.selected);
				// parent.selected = allChildrenSelected;
				parent.selected = parent.childrens.some((child: any) => child.selected);
			}
		}
		this.updateSelectedPermissions();
	}


	getSelectedChildren(permission: any): any[] {
		if (!permission.childrens) return [];
		return permission.childrens.filter((child: any) => child.selected);
	}

	updateSelectedPermissions(): void {
		this.selectedPermissions = [];
		this.permissions.forEach((permission: any) => {
			if (permission.selected) {
				this.selectedPermissions.push(permission);
			}

			if (permission.childrens) {
				permission.childrens.forEach((child: any) => {
					if (child.selected) {
						this.selectedPermissions.push(child);
					}
				});
			}
		});
	}

	flattenPermissions(permissions: any[]): any[] {
		const flatPermissions: any[] = [];

		const flatten = (permissions: any[]) => {
			permissions.forEach(permission => {
				flatPermissions.push(permission);
				if (permission.childrens && permission.childrens.length > 0) {
					flatten(permission.childrens);
				}
			});
		};

		flatten(permissions);
		return flatPermissions;
	}


	//send data
	onSubmit() {
		if (this.isSubmitting) {
			return;
		}
		if (this.selectedPermissions.length <= 0) {
			this.messageService.add({
				severity: 'warning',
				summary: 'Cảnh báo',
				detail: 'Bạn phải chọn ít nhất 1 quyền cho nhóm quyền này',
			});
			return;
		}
		if (this.roleForm.valid) {
			const request = this.roleForm.value;
			request.id=this.permissionId;
			request.permissionIds = this.selectedPermissions.map((res:any) => res.id);
			this.isSubmitting = true;
			this.roleService.edit(request).subscribe(
				(res) => {
					if (res.status == true) {
						this.messageService.add({
							severity: 'success',
							summary: 'Thành công',
							detail: res.message,
						});
						this.router.navigate(['/decentralization/role'])
					}
					else {
						this.messageService.add({
							severity: 'error',
							summary: 'Thất bại',
							detail: res.message,
						});
					}
				},
				(exception) => {
					this.messageService.add({
						severity: 'error',
						summary: 'Lỗi',
						detail: 'Lỗi hệ thống',
					});
					this.isSubmitting = false;

				},
				() => {
					this.isSubmitting = false;
				})
		}
		else {
			markAllAsTouched(this.roleForm);
			this.messageService.add({
				severity: 'warning',
				summary: 'Cảnh báo',
				detail: 'Cần nhập đủ thông tin',
			});
		}
	}













	// validate
	roleForm: FormGroup;
	validationMessages = {
		name: [
			{ type: 'required', message: 'Tên vai trò không được để trống' },
		],
		employeeName: [
			{ type: 'required', message: 'Tên nhân viên không được để trống' },
		]
	};

}
