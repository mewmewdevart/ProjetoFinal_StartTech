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
  email: string;
  tipoUsuario: string;
  //username: string;
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

  isLogged(): boolean {
	return this.loggedInSubject.value;
  }

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

		  this.tipoUsuario = usuarioEncontrado.type;  
		  if (usuarioEncontrado.type === 'admin')
			this.router.navigate(['admin']);
		  else 
		  	this.router.navigate(['home']);

		} else {
		  this.loggedInSubject.next(false);
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
  

  // Método para deslogar o usuário
  logout(): void {
	this.loggedInSubject.next(false);
	this.router.navigate(['/home-externa']); // Redireciona para a página de home-externa após o logout
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


/*
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ComunicacaoService {
	usuarios: Array<any> = [];
  name: string;
  email: string;
  tipoUsuario: string;
  password: string;
  conteudoSelecionado: any;

  private loggedInSubject = new BehaviorSubject<boolean>(false); // BehaviorSubject para rastrear o status de login
  private horizontalPosition: MatSnackBarHorizontalPosition = 'end'; // Posição horizontal para o snackbar
  private verticalPosition: MatSnackBarVerticalPosition = 'top'; // Posição vertical para o snackbar

  


  constructor(
	private router: Router,
	private _snackBar: MatSnackBar,
	private httpClient: HttpClient
  ) {}

  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable(); // Observable para expor o status de login

  isLogged(): boolean {
	return this.loggedInSubject.value; // Método para verificar se o usuário está logado
  }

  // Método para lidar com o login do usuário
  login(username: string, password: string): Observable<boolean> {
	return this.httpClient.get<any[]>('https://db-api-startcine.vercel.app/api/users-info').pipe(
	  map((response) => {
		this.usuarios = response;
		const usuarioEncontrado = this.usuarios.find(
		  (usuario) =>
			usuario.username === username && usuario.password === password
		);
		if (usuarioEncontrado) {
		  this.loggedInSubject.next(true); // Define o status de login como verdadeiro
		  this.handleSnackBar('Login realizado com sucesso!'); // Exibe mensagem de sucesso
		  this.handleNavigation(usuarioEncontrado.type); // Redireciona com base no tipo de usuário
		  return true;
		} else {
		  this.loggedInSubject.next(false); // Define o status de login como falso
		  this.handleSnackBar('Usuário ou senha incorretos!'); // Exibe mensagem de erro
		  return false;
		}
	  }),
	  catchError((error) => {
		this.handleSnackBar('Erro ao buscar usuário!' + error); // Exibe mensagem de erro
		return throwError(error);
	  })
	);
  }

  // Método para lidar com o logout do usuário
  logout(): void {
	this.loggedInSubject.next(false); // Define o status de login como falso
	this.router.navigate(['/home-externa']); // Redireciona para a página externa inicial
  }

  // Método para recuperar conteúdos favoritos
  getConteudosFavoritos(): Observable<any[]> {
	return this.httpClient.get<any[]>('https://db-api-startcine.vercel.app/api/movies-info').pipe(
	  map((conteudos) => conteudos.filter((conteudo) => conteudo.favorito === true))
	);
  }

  // Método para alternar o status de favorito de um conteúdo
  toggleFavorito(conteudoId: string): Observable<any> {
	return this.httpClient.get<any>('https://db-api-startcine.vercel.app/api/movies-info/' + conteudoId).pipe(
	  switchMap((conteudo) => {
		conteudo.favorito = !conteudo.favorito;
		return this.httpClient.patch('https://db-api-startcine.vercel.app/api/movies-info/' + conteudoId, { favorito: conteudo.favorito }).pipe(
		  switchMap(() => this.getConteudosFavoritos()),
		  catchError((error) => {
			conteudo.favorito = !conteudo.favorito;
			return throwError(error);
		  })
		);
	  })
	);
  }

  // Método para definir o conteúdo selecionado
  setConteudoSelecionado(conteudo: any) {
	this.conteudoSelecionado = conteudo;
}

  // Método para adicionar novo conteúdo
  adicionarConteudo(conteudo: any): Observable<any> {
	return this.httpClient.post('https://db-api-startcine.vercel.app/api/movies-info', conteudo);
  }

  // Método para editar conteúdo existente
  editarConteudo(conteudoId: string, novoConteudo: any): Observable<any> {
	return this.httpClient.patch(`https://db-api-startcine.vercel.app/api/movies-info/${conteudoId}`, novoConteudo);
  }

  // Método para excluir conteúdo existente
  excluirConteudo(conteudoId: string): Observable<any> {
	return this.httpClient.delete(`https://db-api-startcine.vercel.app/api/movies-info/${conteudoId}`);
  }

  // Método para obter conteúdo por ID
  getConteudoPorId(conteudoId: string): Observable<any> {
	return this.httpClient.get(`https://db-api-startcine.vercel.app/api/movies-info/${conteudoId}`);
  }

  // Método para obter todos os conteúdos
  getTodosConteudos(): Observable<any[]> {
	return this.httpClient.get<any[]>('https://db-api-startcine.vercel.app/api/movies-info');
  }

  // Método para obter conteúdos por categoria
  getConteudosPorCategoria(categoria: string): Observable<any[]> {
	return this.httpClient.get<any[]>(`https://db-api-startcine.vercel.app/api/movies-info/categoria/${categoria}`);
  }

  // Método para exibir um snackbar com uma mensagem
  private handleSnackBar(message: string): void {
	this._snackBar.open(message, 'Fechar', {
	  horizontalPosition: this.horizontalPosition,
	  verticalPosition: this.verticalPosition,
	  duration: 5000,
	});
  }

  // Método para lidar com a navegação com base no tipo de usuário
  private handleNavigation(userType: string): void {
	if (userType === 'admin') {
	  this.router.navigate(['admin']); // Redireciona para a página de administração
	} else {
	  this.router.navigate(['home']); // Redireciona para a página inicial
	}
  }
}
 */