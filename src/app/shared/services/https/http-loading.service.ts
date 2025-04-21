import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class HttpLoadingService {
  private baseUrl: string = environment.host.apiAdminBaseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  private getToken(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.token || '';
  }

  private createHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });
  }

  private handleErrorResponse(error: HttpErrorResponse) {
    console.error('HTTP Error:', error);
  }

  private buildQueryParams(data: any): string {
    if (data) {
      const params = new URLSearchParams();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          params.set(key, data[key]);
        }
      }
      return params.toString();
    }
    return '';
  }

  public get(endpoint: string, data: any): Observable<any> {
    const headers = this.createHeaders();
    const queryParams = this.buildQueryParams(data);

    return this.http.get(`${this.baseUrl}/${endpoint}${queryParams ? `?${queryParams}` : ''}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      }),
      finalize(() => {
      })
    );
  }

  public getBlob(endpoint: string, data: any): Observable<Blob> {
    const headers = this.createHeaders();
    const queryParams = this.buildQueryParams(data);

    return this.http.get(`${this.baseUrl}/${endpoint}${queryParams ? `?${queryParams}` : ''}`, {
      headers,
      responseType: 'blob'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      }),
      finalize(() => {
      })
    );
  }

  public post(endpoint: string, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      }),
      finalize(() => {
      })
    );
  }

  public put(endpoint: string, data: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  public delete(endpoint: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.baseUrl}/${endpoint}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      })
    );
  }

  public postFormData(endpoint: string, formData: FormData): Observable<any> {
    const headers = this.createHeadersForFormData();

    return this.http.post(`${this.baseUrl}/${endpoint}`, formData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
        return throwError(error);
      }),
      finalize(() => {
      })
    );
  }

  private createHeadersForFormData() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }
}
