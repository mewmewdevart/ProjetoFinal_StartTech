import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarModule,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { ComunicacaoService } from '../../comunicacao.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatTabsModule, MatTableModule, MatIconModule, MatSnackBarModule, MatDialogModule],
})

export class AdminComponent implements OnInit {
	conteudos: any[] = [];
	ultimoId: number = 0; // Variável para rastrear o último ID

	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	displayedColumns: string[] = ['foto', 'descricao', 'acoes'];
	dataSource = new MatTableDataSource<any>();

	constructor(
		public dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private http: HttpClient,
		private comunicacaoService: ComunicacaoService
	) {}

	ngOnInit(): void {
		this.listarConteudos();
	}

	listarConteudos(): void {
		this.http.get<any[]>('http://localhost:3000/conteudo').subscribe(data => {
			this.conteudos = data.reverse(); //Exibir de baixo para cima
			this.dataSource.data = this.conteudos;

			// Encontrar o último ID na lista de conteudos para usar como ref. na hora de cadastrar conteudo
			if (this.conteudos.length > 0) 
				this.ultimoId = this.conteudos[0].id;
		});
	}
	//atualizarTabela(): void {
	//	this.listarConteudos();
	// }
	modalAdicionar(enterAnimationDuration: string, exitAnimationDuration: string): void {
		const dialogRef = this.dialog.open(AdicionarConteudo, {
			width: '1000px',
			data: {
				enterAnimationDuration,
				exitAnimationDuration,
				ultimoId: this.ultimoId, // Enviando o valor do ultimoId para AdicionarConteudo
			},
		});
		//dialogRef.componentInstance.conteudoAdicionado.subscribe(() => {
		//	this.atualizarTabela();
		//  });
	}

	modalEditar(conteudoId: string, enterAnimationDuration: string, exitAnimationDuration: string): void {
		const dialogRef = this.dialog.open(EditarConteudo, {
			width: '1000px',
			data: {
				conteudoId,
				enterAnimationDuration,
				exitAnimationDuration,
			},
		});

		dialogRef.afterClosed().subscribe(result => {
			this.listarConteudos();
		});
	}

	filtrarConteudo(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	deletarConteudo(conteudoId: string): void {
		this.http.delete(`http://localhost:3000/conteudo/${conteudoId}`).subscribe(
			() => {
				this._snackBar.open('O conteúdo foi removido!', 'Fechar', {
					horizontalPosition: this.horizontalPosition,
					verticalPosition: this.verticalPosition,
					duration: 5000,
				});
				this.listarConteudos();
			},
			error => {
				this._snackBar.open(`Ocorreu um erro ao remover o conteúdo: ${error}`, 'Fechar', {
					horizontalPosition: this.horizontalPosition,
					verticalPosition: this.verticalPosition,
					duration: 5000,
				});
			}
		);
	}

	toggleFavorito(conteudoId: string): void {
		this.http.get<any>(`http://localhost:3000/conteudo/${conteudoId}`).subscribe(data => {
			const conteudo = data;
			conteudo.favorito = !conteudo.favorito;

			this.http.patch(`http://localhost:3000/conteudo/${conteudoId}`, { favorito: conteudo.favorito }).subscribe(
				() => {
					if (conteudo.favorito === true) {
						this._snackBar.open('O conteúdo foi favoritado!', 'Fechar', {
							horizontalPosition: this.horizontalPosition,
							verticalPosition: this.verticalPosition,
							duration: 5000,
						});
					} else {
						this._snackBar.open('O conteúdo foi removido dos favoritos...', 'Fechar', {
							horizontalPosition: this.horizontalPosition,
							verticalPosition: this.verticalPosition,
							duration: 5000,
						});
					}

					this.listarConteudos();
				},
				() => {
					this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o conteúdo!', 'Fechar', {
						horizontalPosition: this.horizontalPosition,
						verticalPosition: this.verticalPosition,
						duration: 5000,
					});
					conteudo.favorito = !conteudo.favorito;
				}
			);
		});
	}
}

@Component({
	selector: 'adicionar-conteudo',
	templateUrl: './adicionar-conteudo.html',
	styleUrls: ['./modal.scss'],
	standalone: true,
	imports: [MatDialogModule, MatFormFieldModule, MatTabsModule, MatInputModule, CommonModule, FormsModule],
})
export class AdicionarConteudo {
	ultimoId: number;
	//conteudo: any = {};
	title: string;
	categoria: string;
	releaseYear: number;
	image: string;
	genre: string[];
	director: string;
	actors: string[];
	rating: number;
	iframe: string;
	favorito: boolean = false;
	sinopse: string;
	duracao: string;
	classificacao: string;

	/*
	isFormValid = false;
	updateFormValidity() {
		const requiredFields = [
		  this.conteudo.categoria,
		  this.conteudo.title,
		  this.conteudo.releaseYear,
		  this.conteudo.image,
		  this.conteudo.director,
		  this.conteudo.iframe,
		  this.conteudo.classificacao,
		  this.conteudo.duracao,
		  this.conteudo.sinopse,
		  this.conteudo.nomeConteudo
		];
		this.isFormValid = requiredFields.every(field => field !== undefined && field !== null && field !== '');
	  }
	*/
	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(
		private http: HttpClient,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<AdicionarConteudo>,
		@Inject(MAT_DIALOG_DATA) public data: any
	  ) {
		if (data && data.ultimoId) {
			this.ultimoId = data && data.ultimoId ? data.ultimoId : 0; // caso nao tenha nada
		}
	  }
	  
	//conteudoAdicionado: EventEmitter<any> = new EventEmitter();
	adicionarConteudo() {
		this.ultimoId++;

		const novoConteudo = {
			id: this.ultimoId,
			categoria: this.categoria,
			title: this.title,
			releaseYear: this.releaseYear,
			image: this.image,
			genre: this.genre,
			director: this.director,
			actors: this.actors,
			rating: this.rating,
			iframe: this.iframe,
			favorito: false,
			sinopse: this.sinopse,
			duracao: this.duracao,
			classificacao: this.classificacao,
		};

		this.http.post('http://localhost:3000/conteudo', novoConteudo).subscribe(
			(response) => {
				this._snackBar.open('Conteúdo cadastrado com sucesso!', 'Fechar', {
					horizontalPosition: this.horizontalPosition,
					verticalPosition: this.verticalPosition,
					duration: 5000,
				});
				//this.conteudoAdicionado.emit(); // Atuaalizando a lista de conteudos
			},
			(error) => {
				console.error('Erro ao cadastrar conteúdo:', error);
				this._snackBar.open('Erro ao cadastrar conteúdo!', 'Fechar', {
					horizontalPosition: this.horizontalPosition,
					verticalPosition: this.verticalPosition,
					duration: 5000,
				});
			}
		);
	}
}

@Component({
	selector: 'editar-conteudo',
	templateUrl: './editar-conteudo.html',
	styleUrls: ['./modal.scss'],
	standalone: true,
	imports: [MatDialogModule, MatFormFieldModule, MatTabsModule, MatInputModule, CommonModule, FormsModule],
})
export class EditarConteudo implements OnInit {
	conteudo: any = {};

	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
	verticalPosition: MatSnackBarVerticalPosition = 'bottom';

	constructor(
		private http: HttpClient,
		private _snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<AdicionarConteudo>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	ngOnInit(): void {
		this.http.get<any>(`http://localhost:3000/conteudo/${this.data}`).subscribe(response => {
		  this.conteudo = response;
		});
	  }
	  

	editarConteudo() {
		const dadosConteudo = {
			title: this.conteudo.title,
			categoria: this.conteudo.categoria,
			releaseYear: this.conteudo.releaseYear,
			image: this.conteudo.image,
			genre: this.conteudo.genre,
			director: this.conteudo.director,
			actors: this.conteudo.actors,
			rating: this.conteudo.rating,
			iframe: this.conteudo.iframe,
			sinopse: this.conteudo.sinopse,
			duracao: this.conteudo.duracao,
			classificacao: this.conteudo.classificacao,
		};

		this.http.patch('http://localhost:3000/conteudo/' + this.data, dadosConteudo )
	  .subscribe(
		(response) => {
		  this._snackBar.open('Conteudo alterado com sucesso!', 'Fechar', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 5000
		  });
		},
		(error) => {
		  console.error('Erro ao alterar o conteudo:', error);
		  this._snackBar.open('Erro ao cadastrar conteudo!', 'Fechar', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 5000
		  });
		}
	  );
	}
}