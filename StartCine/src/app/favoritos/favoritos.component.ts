import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacaoService } from '../comunicacao.service';

@Component({
	selector: 'app-favoritos',
	templateUrl: './favoritos.component.html',
	styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

	conteudosFavoritos: any[] = [];

	constructor(
		private comunicacaoService: ComunicacaoService,
		private router: Router
	) {}

	// Navega para a página de detalhes do conteúdo
	verDetalhes(conteudoId: string): void {
		this.router.navigate(['/detalhes', conteudoId]);
	}

	ngOnInit() {
		this.getConteudosFavoritos();
	}

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
}
