import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ListaReparatiiServiceService } from './lista-reparatii-service.service';
import { ReparatiiServiceService } from '../reparatii/reparatii-service.service';
@Component({
  selector: 'app-lista-reparatii',
  standalone: true,
  imports: [ MatIconModule, MatPaginatorModule, MatTableModule, MatInputModule, MatFormFieldModule ],
  templateUrl: './lista-reparatii.component.html',
  styleUrls: ['./lista-reparatii.component.scss']
})
export class ListaReparatiiComponent implements OnInit{
  displayedColumns: string[] = [
    'numePersoana',
    'prenumePersoana',
    'problemaMasina',
    'nrPieseSchimbate',
    'pret',
    'durataReparatie'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private reparatiiService: ReparatiiServiceService,
  ) {}

  ngOnInit(): void {
    this.listaReparatii();
    console.log(this.listaReparatii);
  }

  listaReparatii() {
    this.reparatiiService.getReparatii().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
