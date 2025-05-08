import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root'
})
export class DeviceCategoryService {

    constructor(private http: HttpLoadingService,
        private httpCl: HttpClient
    ) { }


    paging(request: any = null): Observable<any> {
        return this.http.get('device-category/paging', request);
    }

    getDeviceCategorySummaryByRoomPaging(request: any = null): Observable<any> {
        return this.http.get('device-category/get-summary-by-room-id', request);
    }
    getDeviceCategorySummaryPaging(request: any = null): Observable<any> {
        return this.http.get('device-category/get-summary', request);
    }
    getById(request: any ): Observable<any> {
        return this.http.get('device-category/get-by-id', request);
    }

    create(request: any): Observable<any> {
        return this.http.postFormData('device-category/create', request);
    }

    edit(request: any): Observable<any> {
        return this.http.put('device-category/edit', request);
    }

    updateStatus(request: any): Observable<any> {
        return this.http.post('device-category/update-status', request);
    }

    delete(request: any): Observable<any> {
        return this.http.put('device-category/delete', request);
    }

    deleteMultiple(request: any): Observable<any> {
        return this.http.post('device-category/delete-multiple', request);
    }

}
