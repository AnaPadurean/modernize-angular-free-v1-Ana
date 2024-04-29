import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReparatiiServiceService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'http://localhost:3000/'; // Replace with your actual server URL
  saveProgramare(formData: any): Observable<any> { // Use 'any' for broader compatibility
    return this.httpClient.post(this.baseUrl + 'reparatii', formData);
  }
  getReparatii(): Observable<any> { // Use 'any' for broader compatibility
    return this.httpClient.get(this.baseUrl + 'reparatii');
  }

}
