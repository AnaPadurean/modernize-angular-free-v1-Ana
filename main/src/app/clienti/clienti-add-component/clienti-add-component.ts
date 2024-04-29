import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientiService } from '../clients-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client',
  templateUrl: './clienti-add-component.html',
  styleUrls: ['./clienti-add-component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    private fb: FormBuilder,
    private clientsService: ClientiService
  ) {
    this.clientForm = this.fb.group({
      nume: ['', Validators.required],
      prenume: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      // Apel către serviciul pentru a adăuga clientul
      this.clientsService.addClient(clientData).subscribe({
        next: (res) => {
          alert('Client adăugat cu succes!');
          this.clientForm.reset();
        },
        error: (err) => {
          console.log(err);
          alert('Eroare la adăugarea clientului. Vă rugăm să încercați din nou.');
        }
        
      });
    console.log(clientData)
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
