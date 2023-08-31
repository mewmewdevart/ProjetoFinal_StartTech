import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgFor, NgIf } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  
  imports: [ MatGridListModule, MatCardModule, MatIconModule, NgFor, NgIf, CommonModule,  MatSnackBarModule ],
})
export class HomeComponent implements OnInit {
	filme: any;
  filmes: any;
  filmesGroups: any[] = [];

  getSinopseLimitada(sinopse: string): string {
    const limite = 100;
    if (sinopse.length <= limite) {
      return sinopse;
    } else {
      return sinopse.substring(0, limite) + '...';
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/filmes').subscribe(data => {
      this.filmes = data;
    });
  }

  verDetalhes(filmeId: string): void {   
    this.router.navigate(['/detalhes', filmeId]);
  }

  toggleFavorito(filmeId: string): void {
    this.http.get<any>('http://localhost:3000/filmes/' + filmeId).subscribe(data => {

      this.filme = data;

      this.filme.favorito = !this.filme.favorito;
      this.http.patch('http://localhost:3000/filmes/' + filmeId, { favorito: this.filme.favorito })
        .subscribe(
          response => {
            if (this.filme.favorito === true) {
              this._snackBar.open('O filme foi favoritado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            } else {
              this._snackBar.open('O filme foi removido dos favoritos...', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }

            this.http.get<any>('http://localhost:3000/filmes/').subscribe(data => {
              this.filmes = data;
            });
          },
          error => {
              this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o filme!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
              this.filme.favorito = !this.filme.favorito;
            } 
            
      );
    });
 
  }

}
