import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  params?: HttpParams;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient) {}
}
