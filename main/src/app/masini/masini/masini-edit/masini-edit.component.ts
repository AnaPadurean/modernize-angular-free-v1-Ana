import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-masini',
  templateUrl: './masini-edit.component.html',
  styleUrls: ['./masini-edit.component.scss']
})
export class MasiniEditDialogComponent {
  masiniForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MasiniEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.masiniForm = this.fb.group({
      numarInmatriculare: [data.numarInmatriculare, Validators.required],
      serieSasiu: [data.serieSasiu, Validators.required],
      marca: [data.marca, Validators.required ],
      model: [data.model, Validators.required],
      anFabricatie: [data.anFabricatie, Validators.required],
      tipMotorizare: [data.tipMotorizare, Validators.required],
      capacitateMotor: [data.capacitateMotor, Validators.required],
      caiPutere: [data.caiPutere, Validators.required],
    });
  }

  onSaveMasini(): void {
    if (this.masiniForm.valid) {
      console.log(this.masiniForm);
      debugger
      console.log(this.masiniForm)
      this.dialogRef.close(this.masiniForm.value);
      
    }
    console.log(this.masiniForm);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
