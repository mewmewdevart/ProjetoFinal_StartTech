import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ComunicacaoService } from './comunicacao.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private comunicacaoService: ComunicacaoService, private router: Router) {}

	canActivate(): boolean {
		if (this.comunicacaoService.isLogged()) {
			return true; 
		} else {
			this.router.navigate(['/home-externa']); // O usuário não está autenticado, redireciona para a página home-externa
			return false;
		}
	}
}

/*
		if (this.comunicacaoService.isLogged()) {
			if (this.comunicacaoService.tipoUsuario === 'admin') {
				this.router.navigate(['/admin']); 
				return true; 
			} else {
				this.router.navigate(['/home']);
				return true;
			}
*/