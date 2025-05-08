import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceLogService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    paging(request: any = null): Observable<any> {
        return this.http.get('device-log/paging', request);
    }

    getByUser(request: any = null): Observable<any> {
        return this.http.get('device-log/get-by-user-id', request);
    }
    
    getByDevice(request: any = null): Observable<any> {
        return this.http.get('device-log/get-by-device-id', request);
    }
    getById(request: any ): Observable<any> {
        return this.http.get('device-log/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.post('device-log/create', request);
    }

    edit(request: any): Observable<any> {
        return this.http.put('device-log/edit', request);
    }

    updateStatus(request: any): Observable<any> {
        return this.http.post('device-log/update-status', request);
    }

    delete(request: any): Observable<any> {
        return this.http.put('device-log/delete', request);
    }

    deleteMultiple(request: any): Observable<any> {
        return this.http.post('device-log/delete-multiple', request);
    }

}
