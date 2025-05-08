import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    paging(request: any = null): Observable<any> {
        return this.http.get('device/paging', request);
    }

    getById(request: any ): Observable<any> {
        return this.http.get('device/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.post('device/create', request);
    }

    edit(request: any): Observable<any> {
        return this.http.put('device/edit', request);
    }

    updateStatus(request: any): Observable<any> {
        return this.http.post('device/update-status', request);
    }

    delete(request: any): Observable<any> {
        return this.http.put('device/delete', request);
    }

    deleteMultiple(request: any): Observable<any> {
        return this.http.post('device/delete-multiple', request);
    }

}
