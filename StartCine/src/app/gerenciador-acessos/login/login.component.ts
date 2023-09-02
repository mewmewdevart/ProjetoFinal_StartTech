import { Component, ViewEncapsulation } from '@angular/core';
import { ComunicacaoService } from '../../comunicacao.service';
import { HttpClient } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	imports: [
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		FormsModule,
		ReactiveFormsModule,
		NgIf,
	],
})
export class LoginComponent {
	name: string = '';
	username = '';
	email = '';
	password = '';
	confirmPassword: string = '';

	loggedIn = false;
	cadastroForm: FormGroup;

	horizontalPosition: MatSnackBarHorizontalPosition = 'end';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(
		private http: HttpClient,
		private _snackBar: MatSnackBar,
		private formBuilder: FormBuilder,
		private comunicacaoService: ComunicacaoService
	) {
		comunicacaoService.loggedIn$.subscribe((loggedIn: boolean) => {
			this.loggedIn = loggedIn;
		});

		this.cadastroForm = this.formBuilder.group({
			//name: ['', Validators.required],
			//email: ['', [Validators.required, Validators.email]],
			//username: ['', Validators.required],
			//password: ['', Validators.required],
			//confirmPassword: ['', Validators.required],
		});
	}

	login(): void {
		this.comunicacaoService.login(this.username, this.password).subscribe();
	}

	logout(): void {
		this.comunicacaoService.logout();
	}

	novaConta(): void {
		// Verifica se o formulário é válido
		if (this.cadastroForm.valid) {
			const novoUsuario = {
				name: this.name,
				username: this.username,
				password: this.password,
				email: this.email,
				confirmPassword: this.confirmPassword,
				type: "user", // Tipo de usuario por padrao vem como user e nao adm
			};
	
			if (this.password !== this.confirmPassword) {
				this._snackBar.open(
					'Os campos senha e confirmar senha não são iguais!',
					'Fechar',
					{
						horizontalPosition: this.horizontalPosition,
						verticalPosition: this.verticalPosition,
						duration: 5000,
					}
				);
			} else {
				this.http.post('http://localhost:3000/usuarios', novoUsuario).subscribe(
					(response) => {
						this._snackBar.open(
							'Usuário cadastrado com sucesso!',
							'Fechar',
							{
								horizontalPosition: this.horizontalPosition,
								verticalPosition: this.verticalPosition,
								duration: 5000,
							}
						);
					},
					(error) => {
						this._snackBar.open(
							'Erro ao cadastrar usuário!' + error,
							'Fechar',
							{
								horizontalPosition: this.horizontalPosition,
								verticalPosition: this.verticalPosition,
								duration: 5000,
							}
						);
					}
				);
			}
		} else {
			// Exibe uma mensagem de erro informando que o formulário não é válido
			this._snackBar.open(
				'Por favor, preencha todos os campos corretamente!',
				'Fechar',
				{
					horizontalPosition: this.horizontalPosition,
					verticalPosition: this.verticalPosition,
					duration: 5000,
				}
			);
		}
	}	
}
