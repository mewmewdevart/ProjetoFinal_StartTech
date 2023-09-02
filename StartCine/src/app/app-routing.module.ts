import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component'; 
import { ContatoComponent } from './contato/contato.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },

	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'quem-somos', component: QuemSomosComponent },
	{ path: 'conteudo/:categoria', component: ConteudoComponent },
	{ path: 'pesquisa', component: PesquisaComponent },
	{ path: 'favoritos', component: FavoritosComponent },
	{ path: 'contato', component: ContatoComponent },
	{ path: 'detalhes/:id', component: DetalhesComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
