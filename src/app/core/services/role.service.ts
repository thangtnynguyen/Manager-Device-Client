import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    paging(request: any = null): Observable<any> {
        return this.http.get('role/paging', request);
    }

    getById(request: any ): Observable<any> {
        return this.http.get('role/get-by-id', request);
    }

    userHaveRole(request: any): Observable<any> {
        return this.http.get('role/user-have-role', request);
    }

    getRoleByEmployee(request: any ): Observable<any> {
        return this.http.get('role/get-by-employee', request);
    }

    create(request: any): Observable<any> {
        return this.http.post('role/create', request);
    }

    edit(request: any): Observable<any> {
        return this.http.put('role/edit', request);
    }

    delete(request: any): Observable<any> {
        return this.http.put('role/delete', request);
    }

    deleteMultiple(request: any): Observable<any> {
        return this.http.post('role/delete-multiple', request);
    }

}
