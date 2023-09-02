import { Component } from '@angular/core';

@Component({
	selector: 'app-rodape',
	templateUrl: './rodape.component.html',
	styleUrls: ['./rodape.component.scss'],
})
export class RodapeComponent {
		title: string = 'StartCine+';
		copyright: string = 'Desenvolvido em 2023';
		developer: string = 'Start Tech TOTVS';
}
