import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ComunicacaoService } from '../comunicacao.service';

import { NgFor, NgIf } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarModule,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,

	imports: [ MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf, CommonModule,  MatSnackBarModule ],
})
export class HomeComponent implements OnInit {
	// Variáveis locais para armazenar dados de conteúdo (que inclui filmes, séries e animes)
	conteudo: any;
	conteudos: any[] = [];
	conteudosGroups: any[] = [];
	conteudosFavoritos: any[] = [];

	getConteudosFavoritos() {
		this.comunicacaoService.getConteudosFavoritos().subscribe(
			(conteudos) => {
				this.conteudosFavoritos = conteudos;
			},
			(error) => {
				console.error('Erro ao buscar conteúdos favoritos:', error);
			}
		);
	}

	// Função para obter uma sinopse com a quantidade de caracteres limitada
	getSinopseLimitada(sinopse: string): string {
		const limite = 150;
		if (sinopse.length <= limite) {
			return sinopse;
		} else {
			return sinopse.substring(0, limite) + '...';
		}
	}

	// Função para dividir um array em grupos menores
	dividirArrayEmGrupos(array: any[], tamanho: number): any[] {
		const grupos = [];
		for (let i = 0; i < array.length; i += tamanho) {
			grupos.push(array.slice(i, i + tamanho));
		}
		return grupos;
	}

	// Posições para exibição do snack bar
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(
		private router: Router,
		private http: HttpClient,
		private _snackBar: MatSnackBar,
		private comunicacaoService: ComunicacaoService
	) {}

	ngOnInit(): void {
		// Carrega dados de conteúdo (filmes, séries e animes) através de uma requisição HTTP
		this.http.get<any>('http://localhost:3000/conteudo').subscribe(data => {
			this.conteudos = data;
		});
	}

	// Navega para a página de detalhes do conteúdo
	verDetalhes(conteudoId: string): void {
		this.router.navigate(['/detalhes', conteudoId]);
	}

	// Alterna o status de favorito de um conteúdo
	toggleFavorito(conteudoId: string): void {
		this.http.get<any>('http://localhost:3000/conteudo/' + conteudoId).subscribe(data => {
			this.conteudo = data;

			// Inverte o status de favorito
			this.conteudo.favorito = !this.conteudo.favorito;

			// Atualiza o status de favorito do conteúdo na API
			this.http.patch('http://localhost:3000/conteudo/' + conteudoId, { favorito: this.conteudo.favorito })
				.subscribe(
					response => {
						if (this.conteudo.favorito === true) {
							// Exibe uma mensagem no snack bar se o conteúdo for favoritado
							this._snackBar.open('O conteúdo foi favoritado!', 'Fechar', {
								horizontalPosition: this.horizontalPosition,
								verticalPosition: this.verticalPosition,
								duration: 5000
							});
						} else {
							// Exibe uma mensagem no snack bar se o conteúdo for removido dos favoritos
							this._snackBar.open('O conteúdo foi removido dos favoritos...', 'Fechar', {
								horizontalPosition: this.horizontalPosition,
								verticalPosition: this.verticalPosition,
								duration: 5000
							});
						}

						// Atualiza a lista de conteúdos após a alteração de favorito
						this.http.get<any>('http://localhost:3000/conteudo/').subscribe(data => {
							this.conteudos = data;
						});
					},
					error => {
						// Exibe uma mensagem de erro no snack bar se ocorrer um erro ao favoritar/desfavoritar o conteúdo
						this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o conteúdo!', 'Fechar', {
							horizontalPosition: this.horizontalPosition,
							verticalPosition: this.verticalPosition,
							duration: 5000
						});
						// Reverte a alteração de favorito
						this.conteudo.favorito = !this.conteudo.favorito;
					}
				);
		});
	}
}
