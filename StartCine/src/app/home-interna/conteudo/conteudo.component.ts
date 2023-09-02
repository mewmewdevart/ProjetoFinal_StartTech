import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunicacaoService } from '../../comunicacao.service';

@Component({
	selector: 'app-conteudo',
	templateUrl: './conteudo.component.html',
	styleUrls: ['./conteudo.component.scss']
})
export class ConteudoComponent implements OnInit {
	categoria: string;
	conteudos: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private comunicacaoService: ComunicacaoService,
		private router: Router 
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			const categoriaParam = params.get('categoria');
			if (categoriaParam !== null) {
				this.categoria = categoriaParam;
				this.carregarConteudosPorCategoria(this.categoria);
			} else {
				this.router.navigate(['/']); // Redirecionar o usuário para a home se não houver categoria na URL
			}
		});
	}

	carregarConteudosPorCategoria(categoria: string): void {
		this.comunicacaoService.getConteudosPorCategoria(categoria).subscribe(
			(conteudos) => {
				this.conteudos = conteudos;
			},
			(error) => {
				console.error('Erro ao buscar conteúdos por categoria:', error);
			}
		);
	}

	verDetalhes(conteudoId: string): void {
		this.router.navigate(['/detalhes', conteudoId]);
	}
}
