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
<<<<<<< HEAD
=======
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NgFor } from '@angular/common';
>>>>>>> origin/larissa-exibicoes-internas

// Import do módulo CommonModule do Angular
import { CommonModule } from '@angular/common';

// Import dos componentes personalizados do aplicativo
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { CabecalhoComponent } from './home-interna/cabecalho/cabecalho.component';
import { DetalhesComponent } from './home-interna/detalhes/detalhes.component';
import { RodapeComponent } from './home-interna/rodape/rodape.component';
import { ComunicacaoService } from './comunicacao.service';
=======
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { HomeComponent } from './home/home.component';
import { ExibicoesExternasComponent } from './exibicoes-externas/exibicoes-externas.component';
import { HomeExternaComponent } from './home-externa/home-externa.component';
<<<<<<< HEAD
import { RodapeComponent } from './rodape/rodape.component';
import { RodapeDadosComponent } from './rodape-dados/rodape-dados.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
>>>>>>> origin/larissa-exibicoes-internas
=======
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr'
>>>>>>> origin/edu-login-cadastro

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
<<<<<<< HEAD
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
=======
  declarations: [
    AppComponent,
    CabecalhoComponent,
    HomeComponent,
    ExibicoesExternasComponent,
    HomeExternaComponent,
    RodapeComponent,
    RodapeDadosComponent,
    SliderHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
<<<<<<< HEAD
    NgFor,
    MatTabsModule
=======
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFor,
    ToastrModule.forRoot()
>>>>>>> origin/edu-login-cadastro
  ],
  providers: [],
  bootstrap: [AppComponent]
>>>>>>> origin/larissa-exibicoes-internas
})
export class AppModule { }
