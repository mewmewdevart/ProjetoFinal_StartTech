import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-pesquisa',
	templateUrl: './pesquisa.component.html',
	styleUrls: ['./pesquisa.component.scss']
})
export class PesquisaComponent implements OnInit {
	displayedColumns: string[] = ['foto', 'descricao'];
	dataSource = new MatTableDataSource<any>();
	conteudos: any[] = [];

	constructor(
		private http: HttpClient,
		private route: ActivatedRoute,
		private router: Router ) {}

	ngOnInit(): void {
		this.listarConteudos();
	}

	filtrarConteudo(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
		// Aplica o filtro ao dataSource
		this.dataSource.filter = filterValue;

		// Verifica se o filtro removeu todas as linhas e, se sim, recarrega os dados originais
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	listarConteudos(): void {
		this.http.get<any[]>('http://localhost:3000/conteudo').subscribe(data => {
			this.conteudos = data.reverse(); // Exibir de baixo para cima
			this.dataSource.data = this.conteudos;
		});
	}
	verDetalhes(conteudoId: string): void {
		this.router.navigate(['/detalhes', conteudoId]);
	}
}
