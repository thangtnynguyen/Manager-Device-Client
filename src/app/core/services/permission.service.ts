import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    paging(request: any = null): Observable<any> {
        return this.http.get('permission/paging', request);
    }

    getByRole(request: any = null): Observable<any> {
        return this.http.get('permission/get-by-role', request);
    }

    create(request: any): Observable<any> {
        return this.http.post('permission/create', request);
    }

}
