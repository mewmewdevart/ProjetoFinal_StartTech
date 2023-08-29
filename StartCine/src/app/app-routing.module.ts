import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RodapeDadosComponent } from './rodape-dados/rodape-dados.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'rodape-dados', component: RodapeDadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
