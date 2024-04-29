import { Component } from '@angular/core';
import {  OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasiniServiceService } from '../masini-service.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MasiniEditDialogComponent } from './masini-edit/masini-edit.component';

@Component({
  selector: 'app-masini',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, MatTableModule, MatInputModule, MatFormFieldModule ],
  templateUrl: './masini.component.html',
  styleUrls: ['./masini.component.scss']
})
export class MasiniComponent implements OnInit {
 
  displayedColumns: string[] = [
    'id',
    'numarInmatriculare',
    'serieSasiu',
    'marca',
    'model',
    'anFabricatie',
    'tipMotorizare',
    'capacitateMotor',
    'caiPutere',
    'action'
    
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private masiniService: MasiniServiceService,
  ) {}

  ngOnInit(): void {
    this.listaMasini();
    //console.log(this.listaMasini);
  }

  listaMasini() {
    this.masiniService.getMasina().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log('err');
      },
    });
    //console.log(this.dataSource)
  }
  openEditForm(data:any) {
    const dialogRef = this.dialog.open(MasiniEditDialogComponent, {
      data,
    });
    
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.listaMasini();
        }
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // openAddEditEmployeeDialog() {
  //   const dialogRef = this.dialog.open(MasiniAddEditComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.listaMasini();
  //       }
  //     },
  //   });
  stergeMasina(id: number) {
    const confirm = window.confirm("Sunteți sigur că doriți să ștergeți acesta masina?");
    if (confirm) {
      this.masiniService.deleteMasina(id).subscribe({
        next: (res) => {
          alert('Masina a fost ștearsa!');
          this.listaMasini();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  }
  
