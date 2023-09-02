import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, catchError, map } from 'rxjs/operators';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ComunicacaoService {
  usuarios: Array<any> = [];
  name: string;
  username: string;
  password: string;
  conteudoSelecionado: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
	private router: Router,
	private _snackBar: MatSnackBar,
	private httpClient: HttpClient
  ) {}

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  login(username: string, password: string): Observable<boolean> {
	this.httpClient.get<any[]>('http://localhost:3000/usuarios').subscribe(
	  (response) => {
		this.usuarios = response;
		const usuarioEncontrado = this.usuarios.find(
		  (usuario) =>
			usuario.username === username && usuario.password === password
		);
		if (usuarioEncontrado) {
		  this.loggedInSubject.next(true);
		  this._snackBar.open('Login realizado com sucesso!', 'Fechar', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 5000,
		  });
		  this.router.navigate(['admin']);
		} else {
		  this._snackBar.open('Usuário ou senha incorretos!', 'Fechar', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 5000,
		  });
		}
	  },
	  (error) => {
		this._snackBar.open('Erro ao buscar usuário!' + error, 'Fechar', {
		  horizontalPosition: this.horizontalPosition,
		  verticalPosition: this.verticalPosition,
		  duration: 5000,
		});
	  }
	);
	return this.loggedIn$;
  }

  logout(): void {
	this.loggedInSubject.next(false);
  }

  // BUSCAR CONTEÚDOS FAVORITOS
  getConteudosFavoritos(): Observable<any[]> {
	return this.httpClient.get<any[]>('http://localhost:3000/conteudo').pipe(
	  map((conteudos) => conteudos.filter((conteudo) => conteudo.favorito === true))
	);
  }

  toggleFavorito(conteudoId: string): Observable<any> {
	// Obtenha o conteúdo com base no ID
	return this.httpClient.get<any>('http://localhost:3000/conteudo/' + conteudoId).pipe(
	  switchMap((conteudo) => {
		// Inverte o status de favorito
		conteudo.favorito = !conteudo.favorito;

		// Atualiza o status de favorito do conteúdo na API
		return this.httpClient
		  .patch('http://localhost:3000/conteudo/' + conteudoId, { favorito: conteudo.favorito })
		  .pipe(
			switchMap(() => {
			  // Atualiza a lista de conteúdos após a alteração de favorito
			  return this.getConteudosFavoritos();
			}),
			catchError((error) => {
			  // Reverte a alteração de favorito em caso de erro
			  conteudo.favorito = !conteudo.favorito;
			  return throwError(error);
			})
		  );
	  })
	);
  }

	setConteudoSelecionado(conteudo: any) {
		this.conteudoSelecionado = conteudo;
	}
  
	// Metodo para adicionar um novo conteudo
	adicionarConteudo(conteudo: any): Observable<any> {
		return this.httpClient.post('http://localhost:3000/conteudo', conteudo);
	  }
	
	  // Metodo para editar um conteúdo existente
	  editarConteudo(conteudoId: string, novoConteudo: any): Observable<any> {
		return this.httpClient.patch(`http://localhost:3000/conteudo/${conteudoId}`, novoConteudo);
	  }
	
	   // Metodo para excluir um conteúdo existente
	  excluirConteudo(conteudoId: string): Observable<any> {
		return this.httpClient.delete(`http://localhost:3000/conteudo/${conteudoId}`);
	  }
	
	   // Metodo para buscar um conteúdo por ID
	  getConteudoPorId(conteudoId: string): Observable<any> {
		return this.httpClient.get(`http://localhost:3000/conteudo/${conteudoId}`);
	  }
	
	  // Metodo para buscar todos os conteúdos
	  getTodosConteudos(): Observable<any[]> {
		return this.httpClient.get<any[]>('http://localhost:3000/conteudo');
	  }

	  // Metodo para conseguir os conteudos por categoria
	  getConteudosPorCategoria(categoria: string): Observable<any[]> {
		return this.httpClient.get<any[]>(`http://localhost:3000/conteudo?categoria=${categoria}`);
	  }
}
