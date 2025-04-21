import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { markAllAsTouched } from 'src/app/core/helpers/validatorHelper';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
	selector: 'app-create-role',
	templateUrl: './create-role.component.html',
	styleUrls: ['./create-role.component.css']
  })
export class CreateRoleComponent implements OnInit {
	//var
	breadcrumbs!: any[];
	user: any;
	permissions: any[] = [];
	selectedPermissions: any = [];
	isSubmitting: boolean = false;

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
			description:[null]
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
					selected: false,
					childrens: permission.childrens?.map((child:any) => ({
						...child,
						selected: false
					}))
				}));
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
			request.permissionIds = this.selectedPermissions.map((res:any) => res.id);
			this.isSubmitting = true;
			this.roleService.create(request).subscribe(
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
						detail: 'Lỗi hệ thống: Tên vai trò không được trùng nhau',
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
