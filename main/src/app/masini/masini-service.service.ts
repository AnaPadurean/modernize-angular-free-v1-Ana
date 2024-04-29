import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MasiniServiceService {

  baseUrl: string = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) { }


addMasina(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl + 'masini', data);
 }

updateMasina(id_masina: number, data: any): Observable<any> {
  return this.httpClient.put(this.baseUrl + `masini/${id_masina}`, data);
}

getMasina(): Observable<any> {
  return this.httpClient.get(this.baseUrl + 'masini');
}

deleteMasina(id: number): Observable<any> {
  return this.httpClient.delete(this.baseUrl + `masini/${id}`);
}

}
