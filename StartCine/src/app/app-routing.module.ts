import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './gerenciador-acessos/login/login.component';
import { AdminComponent } from './home-interna/admin/admin.component';
import { HomeComponent } from './home-interna/home.component';
import { ContatoComponent } from './contato/contato.component';
import { DetalhesComponent } from './home-interna/detalhes/detalhes.component';
import { ConteudoComponent } from './home-interna/conteudo/conteudo.component';
import { FavoritosComponent } from './home-interna/favoritos/favoritos.component';
import { PesquisaComponent } from './home-interna/pesquisa/pesquisa.component';
import { HomeExternaComponent } from './home-externa/home-externa.component';
import { RodapeDadosComponent } from './home-interna/rodape/rodape-dados/rodape-dados.component';

import { ComunicacaoService } from './comunicacao.service';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; 
=======
import { HomeComponent } from './home/home.component';
import { RodapeDadosComponent } from './rodape-dados/rodape-dados.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rodape-dados', component: RodapeDadosComponent }
];
>>>>>>> origin/larissa-exibicoes-internas

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'home-externa', component: HomeExternaComponent },
	{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
	{ path: 'conteudo/:categoria', component: ConteudoComponent, canActivate: [AuthGuard] },
	{ path: 'pesquisa', component: PesquisaComponent, canActivate: [AuthGuard] },
	{ path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuard] },
	{ path: 'contato', component: ContatoComponent },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{ path: 'detalhes/:id', component: DetalhesComponent, canActivate: [AuthGuard] },
	{ path: 'rodape-dados', component: RodapeDadosComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: 'home' }, 
  ];
  
  @NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
  })
  export class AppRoutingModule {
	constructor(private comunicacaoService: ComunicacaoService, private router: Router) {
	  if (this.comunicacaoService.isLogged()) {
		this.router.navigate(['home']);
	  } else {
		this.router.navigate(['home-externa']);
	  }
	}
  }
  