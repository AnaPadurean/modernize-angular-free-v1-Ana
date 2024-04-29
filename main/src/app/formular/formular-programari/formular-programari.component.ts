import { Component, NgModule, OnInit } from '@angular/core';
import { FormularServiceService } from '../formular-service.service';
import { HttpClient } from '@angular/common/http';
import { MasiniServiceService } from '../../masini/masini-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientiService } from '../../clienti/clients-service.service';

interface ProgramariFormData {
  nume: '',
  prenume: '',
  idMasina: '',
  actiune: '',
  modalitateContact: '',
  email: '',
  telefon: '',
  intervalTimp: '',
}
@Component({
  selector: 'app-formular-programari',
  templateUrl: './formular-programari.component.html',
  styleUrls: ['./formular-programari.component.scss'],
})


export class FormularProgramariComponent implements OnInit {
  
  programare: ProgramariFormData = {} as ProgramariFormData; // Object for form data (optional, for adding new programari)
  programariData: any[] = []; // Array to store programari data retrieved from server
  masini: any[] = []; // Inițializăm masini ca un array gol
  clienti: any = {};
  constructor(
   private programareService: FormularServiceService,
    private http: HttpClient,
    
  ) {}

  async ngOnInit() {
    try {
      const data = await this.http.get<any>('http://localhost:3000/masini').toPromise();
      if (data && Array.isArray(data)) {
        this.masini = data; 
        //console.log(data);
      } else {
        console.error('Datele primite de la server nu sunt în formatul așteptat:', data);
      }
    } catch (error) {
      console.error('Eroare la obținerea datelor de la server:', error);
    }

    try {
      const data2 = await this.http.get<any>('http://localhost:3000/clienti').toPromise();
      if (data2 && Array.isArray(data2)) {
        this.clienti = data2; 
       /// console.log(data2);
      } else {
        //console.error('Datele primite de la server nu sunt în formatul așteptat:', data2);
      }
    } catch (error) {
      //console.error('Eroare la obținerea datelor de la server:', error);
    }
    try {
      const programariData = await this.http.get<any[]>('http://localhost:3000/programari').toPromise();
      if (programariData && Array.isArray(programariData)) {
        this.programariData = programariData;
      } else {
        console.error('Error fetching programari data:', programariData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  submitForm() {
    const formData: ProgramariFormData = {
      // Assign form field values to the interface properties
      nume: this.programare.nume || '', // Handle potential undefined values
      prenume: this.programare.prenume || '',
      idMasina: this.programare.idMasina || '',
      actiune: this.programare.actiune || '',
      modalitateContact: this.programare.modalitateContact || '',
      email: this.programare.email || '',
      telefon: this.programare.telefon || '',
      intervalTimp: this.programare.intervalTimp || '',
      
    };
    console.log(formData);
  // Send the form data to the server to save the new programare
  this.programareService.saveProgramare(formData).subscribe(
    (response) => {
      console.log('Form data saved:', response);
      window.alert("Programare efectuata cu succes!");

      // Optionally, update the programariData array in the component
      this.programariData.push(formData);

      // Clear the form fields
      this.programare = { // Create a new object with default values
        nume: '',
        prenume: '',
        idMasina: '',
        actiune: '',
        modalitateContact: '',
        email: '',
        telefon: '',
        intervalTimp: '',
      };
    },
    (error) => console.error('Error saving form data:', error)
  );
}


}