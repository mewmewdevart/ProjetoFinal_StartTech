import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { RodapeComponent } from './rodape/rodape.component';
import { SessionTimerComponent } from './session-timer/session-timer.component';
import { ComunicacaoService } from './comunicacao.service';

import ptBr from '@angular/common/locales/pt';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { HomeExternaComponent } from './home-externa/home-externa.component';
import { ExibicoesComponent } from './home-externa/exibicoes/exibicoes.component';
import { SubhomeComponent } from './home-externa/subhome/subhome.component';

registerLocaleData(ptBr);

@NgModule({
	declarations: [
		AppComponent,
		QuemSomosComponent,
		CabecalhoComponent,
		DetalhesComponent,
		RodapeComponent,
		SessionTimerComponent,
		ConteudoComponent,
		PesquisaComponent,
		FavoritosComponent,
		HomeExternaComponent,
		ExibicoesComponent,
		SubhomeComponent,
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
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
