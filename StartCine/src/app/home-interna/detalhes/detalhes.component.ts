import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ComunicacaoService } from '../../comunicacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
	selector: 'app-detalhes',
	templateUrl: './detalhes.component.html',
	styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
	
	filmeId: string;
	filme: any;
	isButtonDisabled = false;
	filmes: any[] = [];
	filmesAleatorios: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
		private comunicacaoService: ComunicacaoService,
		private _snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.filmeId = params.get('id') ?? '';
			this.http.get<any>('http://localhost:3000/conteudo/' + this.filmeId).subscribe(data => {
				this.filme = data;
			});
		});
		// Pegar todos os Filmes do db + sortea-los
		this.http.get<any[]>('http://localhost:3000/conteudo').subscribe(data => {
			this.filmes = data;
			this.selecionarFilmesAleatorios();
		  });
	}

	// Navega para a pagina de detalhes do filme
	verDetalhes(filmeId: string): void {
		this.router.navigate(['/detalhes', filmeId]);
	}

	selecionarFilmesAleatorios() {
		if (this.filmes.length >= 4) {
		  const filmesCopy = [...this.filmes];
		  this.filmesAleatorios = [];
	
		  // Remove o filme coletado da lista de filmes : P/ evitar repetição
		  const filmeIndex = filmesCopy.findIndex(f => f.id === this.filmeId);
		  if (filmeIndex !== -1) {
			filmesCopy.splice(filmeIndex, 1);
		  }
	
		  // Seleciona aleatoriamente 4 filmes
		  for (let i = 0; i < 4; i++) {
			const randomIndex = Math.floor(Math.random() * filmesCopy.length);
			const filmeSelecionado = filmesCopy.splice(randomIndex, 1)[0];
			this.filmesAleatorios.push(filmeSelecionado);
		  }
		}
	  }
	
	// Função para alternar o status de favorito do filme
	toggleFavorito(filmeId: string): void {
		this.comunicacaoService.toggleFavorito(this.filmeId).subscribe(() => {
			const mensagem = this.filme.favorito ? 'O filme foi removido dos favoritos...' : 'O filme foi favoritado! Olhe a sua lista!';

			this._snackBar.open(mensagem, 'Fechar', {
				horizontalPosition: 'end',
				verticalPosition: 'top',
				duration: 5000
			});
		}, error => {
			this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o filme!', 'Fechar', {
				horizontalPosition: 'end',
				verticalPosition: 'top',
				duration: 5000
			});

			this.filme.favorito = !this.filme.favorito;
		});
		this.isButtonDisabled = true;
		setTimeout(() => {
			this.isButtonDisabled = false;
		}, 5000);
	}
}
