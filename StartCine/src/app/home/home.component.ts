import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
	// Variáveis locais para armazenar dados dos filmes
	filme: any;
	filmes: any;
	filmesGroups: any[] = [];

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
		private _snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		// Carrega dados dos filmes através de uma requisição HTTP
		this.http.get<any>('http://localhost:3000/filmes').subscribe(data => {
			this.filmes = data;
		});
	}

	// Navega para a pagina de detalhes do filme
	verDetalhes(filmeId: string): void {
		this.router.navigate(['/detalhes', filmeId]);
	}

	// Alterna o status de favorito de um filme
	toggleFavorito(filmeId: string): void {
		this.http.get<any>('http://localhost:3000/filmes/' + filmeId).subscribe(data => {
			this.filme = data;

			// Inverte o status de favorito
			this.filme.favorito = !this.filme.favorito;

			// Atualiza o status de favorito do filme na API
			this.http.patch('http://localhost:3000/filmes/' + filmeId, { favorito: this.filme.favorito })
				.subscribe(
					response => {
						if (this.filme.favorito === true) {
							// Exibe uma mensagem no snack bar se o filme for favoritado
							this._snackBar.open('O filme foi favoritado!', 'Fechar', {
								horizontalPosition: this.horizontalPosition,
								verticalPosition: this.verticalPosition,
								duration: 5000
							});
						} else {
							// Exibe uma mensagem no snack bar se o filme for removido dos favoritos
							this._snackBar.open('O filme foi removido dos favoritos...', 'Fechar', {
								horizontalPosition: this.horizontalPosition,
								verticalPosition: this.verticalPosition,
								duration: 5000
							});
						}

						// Atualiza a lista de filmes após a alteração de favorito
						this.http.get<any>('http://localhost:3000/filmes/').subscribe(data => {
							this.filmes = data;
						});
					},
					error => {
						// Exibe uma mensagem de erro no snack bar se ocorrer um erro ao favoritar/desfavoritar o filme
						this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o filme!', 'Fechar', {
							horizontalPosition: this.horizontalPosition,
							verticalPosition: this.verticalPosition,
							duration: 5000
						});
						// Reverte a alteração de favorito
						this.filme.favorito = !this.filme.favorito;
					}
			);
		});
	}
}
