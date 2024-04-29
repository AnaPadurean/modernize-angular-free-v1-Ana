import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularServiceService {
  private baseUrl = 'http://localhost:3000/'; // Replace with your actual server URL

  constructor(private httpClient: HttpClient) { }

  saveProgramare(formData: any): Observable<any> { // Use 'any' for broader compatibility
    return this.httpClient.post(this.baseUrl + 'programari', formData);
  }

  
}



  
