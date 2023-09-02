import { Component } from '@angular/core';
import { ComunicacaoService } from '../comunicacao.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cabecalho',
	templateUrl: './cabecalho.component.html',
	styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent {
	loggedIn = false;

	constructor(
		private router: Router,
		private comunicacaoService: ComunicacaoService) {
			comunicacaoService.loggedIn$.subscribe((loggedIn: boolean) => {
			this.loggedIn = loggedIn;
		});
	}

	logout(): void {
		this.comunicacaoService.logout();
		this.router.navigate(['/home']);
	}
	
}
