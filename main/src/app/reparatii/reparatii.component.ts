import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReparatiiServiceService } from './reparatii-service.service';
import {NgModule} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common'
interface ReparatiiFormData {
  numePersoana: '',
  prenumePersoana: '',
  problemaMasina: '',
  nrPieseSchimbate: '',
  pret: '',
  durataReparatie: '',
}
@Component({
  selector: 'app-reparatii',
  templateUrl: './reparatii.component.html',
  standalone:true,
  imports: [
    MatInputModule,MatSelectModule,FormsModule, CommonModule // Include FormsModule if using template-driven forms
  ],
  styleUrls: ['./reparatii.component.scss']
})
export class ReparatiiComponent implements OnInit{
  reparatii: ReparatiiFormData = {} as ReparatiiFormData; // Object for form data (optional, for adding new programari)
  reparatiiData: any[] = []; // Array to store programari data retrieved from server
  programari: any = {};
  constructor(
   private reparatiiService: ReparatiiServiceService,
    private http: HttpClient,
    
  ) {}
  async ngOnInit() {
    

    try {
      const data3 = await this.http.get<any>('http://localhost:3000/programari').toPromise();
      if (data3 && Array.isArray(data3)) {
        this.programari = data3; 
        console.log(data3);
      } else {
        //console.error('Datele primite de la server nu sunt în formatul așteptat:', data2);
      }
    } catch (error) {
      //console.error('Eroare la obținerea datelor de la server:', error);
    }
    
  }
  submitForm() {
    const formData: ReparatiiFormData = {
      // Assign form field values to the interface properties
      numePersoana: this.reparatii.numePersoana || '', // Handle potential undefined values
      prenumePersoana: this.reparatii.prenumePersoana || '',
      problemaMasina: this.reparatii.problemaMasina || '',
      nrPieseSchimbate: this.reparatii.nrPieseSchimbate || '',
      pret: this.reparatii.pret || '',
      durataReparatie: this.reparatii.durataReparatie || '',
      
    };
      
    console.log(formData);
    // Send the form data to the server to save the new programare
    this.reparatiiService.saveProgramare(formData).subscribe(
      (response) => {
        console.log('Form data saved:', response);
        window.alert("Reparatie inregistrata!");
  
        // Optionally, update the programariData array in the component
        this.reparatiiData.push(formData);
  
        // Clear the form fields
        this.reparatii = { // Create a new object with default values
          numePersoana: '',
          prenumePersoana: '',
          problemaMasina: '',
          nrPieseSchimbate: '',
          pret: '',
          durataReparatie: '',
        };
      },
      (error) => console.error('Error saving form data:', error)
    );


}
}
