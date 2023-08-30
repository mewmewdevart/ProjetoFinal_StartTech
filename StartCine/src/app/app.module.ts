import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIAL UI
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { HomeComponent } from './home/home.component';
import { ExibicoesExternasComponent } from './exibicoes-externas/exibicoes-externas.component';
import { HomeExternaComponent } from './home-externa/home-externa.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RodapeDadosComponent } from './rodape-dados/rodape-dados.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { SubtelaExternaComponent } from './subtela-externa/subtela-externa.component';

@NgModule({
	declarations: [
		AppComponent,
		CabecalhoComponent,
		HomeComponent,
		ExibicoesExternasComponent,
		HomeExternaComponent,
		RodapeComponent,
		RodapeDadosComponent,
		SubtelaExternaComponent,
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
		MatCardModule,
		MatTabsModule,
		CommonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
