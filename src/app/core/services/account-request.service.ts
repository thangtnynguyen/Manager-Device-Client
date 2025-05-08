import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root'
})
export class AccountRequestService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    paging(request: any = null): Observable<any> {
        return this.http.get('account-request/paging', request);
    }

    getById(request: any ): Observable<any> {
        return this.http.get('account-request/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.post('account-request/create', request);
    }

    edit(request: any): Observable<any> {
        return this.http.put('account-request/edit', request);
    }

    updateStatus(request: any): Observable<any> {
        return this.http.post('account-request/update-status', request);
    }

    delete(request: any): Observable<any> {
        return this.http.put('account-request/delete', request);
    }

    deleteMultiple(request: any): Observable<any> {
        return this.http.post('account-request/delete-multiple', request);
    }

}
