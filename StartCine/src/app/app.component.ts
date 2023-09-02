import { Component } from '@angular/core';
import { ComunicacaoService } from './comunicacao.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'StartCine+';

	constructor(public comunicacaoService: ComunicacaoService) {}
}
