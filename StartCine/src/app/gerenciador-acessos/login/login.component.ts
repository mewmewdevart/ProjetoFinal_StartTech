import { Component, ViewEncapsulation } from '@angular/core';
import { ComunicacaoService } from 'src/app/comunicacao.service';

import { HttpClient } from '@angular/common/http';

import {MatTabsModule} from '@angular/material/tabs';
import { NgIf } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ MatTabsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, FormsModule, ReactiveFormsModule, NgIf ],
})
export class LoginComponent {
  name: string = '';
  username = '';
  password = '';
  confirmPassword: string = '';
  email: string = '';
  type: string = 'user';

  loggedIn = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
	private http: HttpClient,
	private _snackBar: MatSnackBar,
	private comunicacaoService: ComunicacaoService
	) {
		comunicacaoService.loggedIn$.subscribe((loggedIn: boolean) => {
	  this.loggedIn = loggedIn;
	});
  }

  login(): void {
	this.comunicacaoService.login(this.username, this.password).subscribe();
  }

  logout(): void {
	this.comunicacaoService.logout();
  }

  novaConta(): void {
	if (!this.name || !this.username || !this.password || !this.confirmPassword || this.password !== this.confirmPassword) {
	  this._snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', {
		horizontalPosition: this.horizontalPosition,
		verticalPosition: this.verticalPosition,
		duration: 5000
	  });
	  return; // Saia da função se houver campos em falta ou senhas não coincidentes
	}
  
	const novoUsuario = {
	  name: this.name,
	  username: this.username,
	  email: this.email,
	  password: this.password,
	  user: this.type,
	};
  
	this.http.post('http://localhost:3000/usuarios', novoUsuario)
	  .subscribe(
		(response) => {
		  this._snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 5000
		  });
		},
		(error) => {
		  this._snackBar.open('Erro ao cadastrar usuário!' + error, 'Fechar', {
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
			duration: 5000
		  });
		}
	  );
  }
}