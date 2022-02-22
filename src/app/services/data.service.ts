import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getCurrencies() {
    return this.http.get<any>(`${environment.apiUrl}general/currency`, {
      headers: this.httpOptions.headers,
    });
  }

  getMachines() {
    return this.http.get<any>(`${environment.apiUrl}mobile/machine`, {
      headers: this.httpOptions.headers,
    });
  }

  getMachineById(id) {
    return this.http.get<any>(`${environment.apiUrlv2}mobile/machine/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  getCustomersAutoComplete(searchQuery = '') {
    if (searchQuery.length < 1) {
      return of(null);
    }
    return this.http.get<any>(
      `${environment.apiUrl}mobile/customers?searchQuery=${searchQuery}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  addSlip(obj) {
    return this.http.post<any>(`${environment.apiUrl}slip`, obj, {
      headers: this.httpOptions.headers,
    });
  }

  addMeter(obj, machineId) {
    return this.http.post<any>(
      `${environment.apiUrl}mobile/meters/${machineId}`,
      obj,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  getUserWallet(id) {
    return this.http.get<any>(`${environment.apiUrl}mobile/wallet/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  getTransactions(staffId, isPending: any = '', isKasaPaid: any = '') {
    return this.http.get<any>(
      `${environment.apiUrl}slot/data?staff=${staffId}&isPending=${isPending}&isKasaPaid=${isKasaPaid}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  deleteTransaction(transactionId) {
    return this.http.delete<any>(
      `${environment.apiUrl}slip/delete/${transactionId}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  submitPendingSlips(staffId, obj) {
    return this.http.post<any>(`${environment.apiUrl}slip/${staffId}`, obj, {
      headers: this.httpOptions.headers,
    });
  }
}
