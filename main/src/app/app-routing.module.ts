import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ɵInternalFormsSharedModule } from '@angular/forms';
import { ClientsComponent } from './clienti/clients.component';
import { MasiniComponent } from './masini/masini/masini.component';
import { FormularProgramariComponent } from 'src/app/formular/formular-programari/formular-programari.component';
import { ReparatiiComponent } from './reparatii/reparatii.component';
import { ListaReparatiiComponent } from './lista-reparatii/lista-reparatii.component';
const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'masini', component: MasiniComponent
        
      },
      {
        path: 'formular', component: FormularProgramariComponent
        
      },
      {
        path: 'reparatii', component: ReparatiiComponent
        
      },
      {
        path: 'listaReparatii', component: ListaReparatiiComponent
        
      },
      {
        path: 'clients', component:ClientsComponent
      }, 
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
 
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MatFormFieldModule,
            ɵInternalFormsSharedModule],

  exports: [RouterModule],
})
export class AppRoutingModule {}
