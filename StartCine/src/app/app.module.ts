// Imports do Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Imports do Material UI (Angular Material)
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Import do módulo CommonModule do Angular
import { CommonModule } from '@angular/common';

// Import dos componentes personalizados do aplicativo
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './home-interna/cabecalho/cabecalho.component';
import { DetalhesComponent } from './home-interna/detalhes/detalhes.component';
import { RodapeComponent } from './home-interna/rodape/rodape.component';
import { ComunicacaoService } from './comunicacao.service';

// Import da localização em português (pt)
import ptBr from '@angular/common/locales/pt';

import { ConteudoComponent } from './home-interna/conteudo/conteudo.component';
import { PesquisaComponent } from './home-interna/pesquisa/pesquisa.component';
import { FavoritosComponent } from './home-interna/favoritos/favoritos.component';
import { HomeExternaComponent } from './home-externa/home-externa.component';
import { ExibicoesComponent } from './home-externa/exibicoes/exibicoes.component';
import { SubhomeComponent } from './home-externa/subhome/subhome.component';
import { RodapeDadosComponent } from './home-interna/rodape/rodape-dados/rodape-dados.component';
import { GerenciadorAcessosComponent } from './gerenciador-acessos/gerenciador-acessos.component';

registerLocaleData(ptBr);

@NgModule({
	declarations: [
		AppComponent,
		CabecalhoComponent,
		DetalhesComponent,
		RodapeComponent,
		ConteudoComponent,
		PesquisaComponent,
		FavoritosComponent,
		HomeExternaComponent,
		ExibicoesComponent,
		SubhomeComponent,
		RodapeDadosComponent,
		GerenciadorAcessosComponent,
	],
	imports: [
		CommonModule,
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatSnackBarModule,
		MatGridListModule,
		MatCardModule,
		MatToolbarModule,
		MatTabsModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
	],
	providers: [
		ComunicacaoService,
	],
	// Definição do esquema de elementos personalizados (Angular Elements Schema)
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	// APPCOMPONENT CARREGANDO INICIALMENTE
	bootstrap: [AppComponent]
})
export class AppModule { }
