import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RodapeDadosComponent } from './rodape-dados/rodape-dados.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rodape-dados', component: RodapeDadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
