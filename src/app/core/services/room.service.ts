import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
  providedIn: 'root', 
})
export class RoomService {

    constructor(private httpLoading: HttpLoadingService) { }

    create(request: any): Observable<any> {
        return this.httpLoading.post('room/create', request);
    }

    paging(request: any = null): Observable<any> {
        return this.httpLoading.get('room/paging', request);
    }

    pagingFloors(request: any = null): Observable<any> {
        return this.httpLoading.get('floor/paging', request);
    }

    pagingBuildings(request: any = null): Observable<any> {
        return this.httpLoading.get('building/paging', request);
    }

    getById(request: any): Observable<any> {
        return this.httpLoading.get('room/get-by-id', request);
    }
}
