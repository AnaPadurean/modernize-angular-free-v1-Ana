import { Component } from '@angular/core';
import {  OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientiService } from './clients-service.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientsEditDialogComponent } from './clienti-edit-component/clienti-edit-component';
import { AddClientComponent } from './clienti-add-component/clienti-add-component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ MatIconModule, MatPaginatorModule, MatTableModule, MatInputModule, MatFormFieldModule ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nume',
    'prenume',
    'email',
    'telefon',
    'id_masina',
    'action'
  ];
 // clients list will be assigned to this and it is passed as the data source to the mat-table in the HTML template 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // dependency injection
  constructor(
    private dialog: MatDialog,
    private clientsService: ClientiService,
  ) {}

  ngOnInit(): void {
    this.listaClienti();
    console.log(this.listaClienti);
  }

  // openEditForm(data:any) {
  //   const dialogRef = this.dialog.open(ClientsEditDialogComponent, {
  //     data,
  //   });
    
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       if (val) {
  //         this.listaClienti();
  //       }
  //     },
  //   });
  // }

  openEditForm(client: any): void {
    const dialogRef = this.dialog.open(ClientsEditDialogComponent, {
      width: '600px',
      data: client
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientsService.editClient(client.id, result).subscribe({
          next: (res) => {
            alert('Client actualizat!');
            this.listaClienti();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  listaClienti() {
    this.clientsService.getClient().subscribe({
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
    console.log(this.dataSource)
  }
  //for searching clients with nume, prenume, email, telefon 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openAddEditEmployeeDialog() {
    const dialogRef = this.dialog.open(ClientsEditDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.listaClienti();
        }
      },
    });
  }

  // getClientById(id: number) {
  //   this.clientsService.getClient(id).subscribe((client: any) => {
  //     console.log('Informații despre clientul cu ID-ul', id, ':', client);
  //   }, (error) => {
  //     console.error('Eroare la obținerea informațiilor despre clientul cu ID-ul', id, ':', error);
  //   });
  // }

  stergeClient(id: number) {
    const confirm = window.confirm("Sunteți sigur că doriți să ștergeți acest client?");
    if (confirm) {
      this.clientsService.deleteClient(id).subscribe({
        next: (res) => {
          alert('Client șters!');
          this.listaClienti();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  
 openAddClientForm(): void {
  
  const dialogRef = this.dialog.open(AddClientComponent, {
    width: '600px', 
  });

  
  dialogRef.afterClosed().subscribe(result => {
  });
 }
  
}

