import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

// import * as clienti from 'db.json'

@Injectable({
  providedIn: 'root',
})
export class ClientiService {

  baseUrl: string = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }
  
  addClient(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'clienti', data);
  }

  updateClient(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `clienti/${id}`, data);
  }

  getClient(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'clienti');
  }

  deleteClient(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `clienti/${id}`);
  }

  editClient(id: number, data: any): Observable<any> {
    return this.httpClient.put(this.baseUrl + `clienti/${id}`, data);
  }

}

