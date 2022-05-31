import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURL } from '../config/api-urls';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public postRequest(url: string, data?: any): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + url, data);
  }

  public getRequest(url: string, data?: any): Observable<any> {
    return this.http.get<any>(environment.baseApiUrl + url, data);
  }

  public putRequest(url: string, data?: any): Observable<any> {
    return this.http.put<any>(environment.baseApiUrl + url, data);
  }
}
