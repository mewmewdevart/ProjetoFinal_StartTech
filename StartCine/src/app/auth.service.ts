import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  usuarios: Array<any> = [];
  name: string;
  username: string;
  password: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ){ }

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  login(username: string, password: string): Observable<boolean> {
   
    this.httpClient.get<any[]>('http://localhost:3000/usuarios')
      .subscribe(
        (response) => {
          this.usuarios = response;
          const usuarioEncontrado = this.usuarios.find(usuario => usuario.username === username && usuario.password === password);
          if (usuarioEncontrado) {
            this.loggedInSubject.next(true);
            this._snackBar.open('Login realizado com sucesso!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            }); 
            this.router.navigate(['admin']);
          }
          else {
            this._snackBar.open('Usuário ou senha incorretos!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            }); 
          }
        },
        (error) => {
          this._snackBar.open('Erro ao buscar usuário!' + error, 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        }
      );
    return this.loggedIn$;
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }
}

