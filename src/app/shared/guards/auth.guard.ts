import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Page } from 'src/app/core/enums/page.enum';
import { AuthService } from 'src/app/core/interceptors/identity/auth.service';
import { AuthToken } from 'src/app/core/models/interfaces/common/auth-token.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        if (this.authService.getUserCurrent()) {
            return of(true);
        } else {
            const authToken: AuthToken | null =
                this.authService.getAuthTokenLocalStorage();

            if (authToken?.accessToken) {
                return this.authService.fetchUserCurrent().pipe(
                    map((res) => {
                        if (res.status) {
                            this.authService.setUserCurrent(res.data);
                            return true;
                        } else {
                            this.authService.setUserCurrent(null);
                            this.authService.setAuthTokenLocalStorage(null);
                            this.router.navigate([Page.Login]);
                            return false;
                        }
                    }),
                    catchError(() => {
                        this.authService.setUserCurrent(null);
                        this.authService.setAuthTokenLocalStorage(null);
                        this.router.navigate([Page.Login]);
                        return of(false);
                    })
                );
            } else {
                this.authService.setUserCurrent(null);
                this.authService.setAuthTokenLocalStorage(null);

                this.router.navigate([Page.Login]);
                return of(false);
            }
        }
    }
}


// import { Injectable } from '@angular/core';
// import {
//     CanActivate,
//     Router,
//     ActivatedRouteSnapshot,
//     RouterStateSnapshot,
// } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { AuthToken } from '../models/identity/auth-token.interface';
// import { AuthService } from '../services/identity/auth.service';
// import { Page } from '../enums/page.enum';

// @Injectable({
//     providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService, private router: Router) {}

//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): Observable<boolean> {
//         if (this.authService.getUserCurrent()) {
//             return of(true);
//         } else {
//             const authToken: AuthToken | null =
//                 this.authService.getAuthTokenLocalStorage();

//             if (authToken?.accessToken) {
//                 return this.authService.fetchUserCurrent().pipe(
//                     map((res) => {
//                         if (res.status) {
//                             this.authService.setUserCurrent(res.data);
//                             return true;
//                         } else {
//                             this.authService.setUserCurrent(null);
//                             this.authService.setAuthTokenLocalStorage(null);
//                             this.router.navigate([Page.Login]);
//                             return false;
//                         }
//                     }),
//                     catchError(() => {
//                         this.authService.setUserCurrent(null);
//                         this.authService.setAuthTokenLocalStorage(null);
//                         this.router.navigate([Page.Login]);
//                         return of(false);
//                     })
//                 );
//             } else {
//                 this.authService.setUserCurrent(null);
//                 this.authService.setAuthTokenLocalStorage(null);

//                 this.router.navigate([Page.Login]);
//                 return of(false);
//             }
//         }
//     }
// }
