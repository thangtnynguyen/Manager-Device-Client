import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
// import { API_CONSTANTS } from '../constants/api.constants';
import { environment } from 'src/environments/environment';
import { HttpLoadingService } from 'src/app/shared/services/https/http-loading.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpLoadingService) {}

    paging(resquest: any):Observable<any>{
        return this.http.get('user/paging', resquest)
    }

    getFilters(
        PageSize: number,
        PageIndex: number,
        Name?: string,
        PhoneNumber?: string,
        Address?: string
    ): Observable<any> {
        const params = {
            PageSize: PageSize.toString(),
            PageIndex: PageIndex.toString(),
            Name: Name || '',
            PhoneNumber: PhoneNumber || '',
            Address: Address || '',
        };
        return this.http.get('user/paging', params);
    }

    createUser(userData: any): Observable<any> {
        return this.http.post('user/create', userData);
    }

    checkUserExists(phoneNumber: string, email: string): Observable<any> {
        const data = { phoneNumber, email };
        return this.http.post('user/check-exists', data);
    }

    getUserById(userId: number): Observable<any> {
        const params = { UserId: userId.toString() };
        return this.http.get('user/get-by-id', params);
    }

    updateUser(data: any): Observable<any> {
        return this.http.put('user/edit-user-info', data);
    }

    ChangePassword(request: any): Observable<any> {
        return this.http.post('user/change-password', request);
    }

    assignRolesToUser(assignRolesPayload: any): Observable<any> {
        return this.http.put('user/assign-user-to-roles', assignRolesPayload);
    }

    assignRolesToEmployee(assignRolesPayload: any): Observable<any> {
        return this.http.put('user/assign-employee-to-roles', assignRolesPayload);
    }

    updateStatusAccount(request: any): Observable<any> {
        return this.http.post('user/lock-unlock', request);
    }
    getAllUser(resquest: any):Observable<any>{
        return this.http.get('/user/paging', resquest)
    }
}
