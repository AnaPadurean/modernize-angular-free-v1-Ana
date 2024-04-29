import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clienti-edit-component.html',
  styleUrls: ['./clients-edit-component.scss']
})
export class ClientsEditDialogComponent {
  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClientsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.clientForm = this.fb.group({
      nume: [data.nume, Validators.required],
      prenume: [data.prenume, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      telefon: [data.telefon, Validators.required],
    });
  }

  onSaveClienti(): void {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
