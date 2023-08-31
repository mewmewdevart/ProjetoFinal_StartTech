import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatIconModule, MatSnackBarModule, MatDialogModule],
})

export class AdminComponent implements OnInit {

  imovel: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['foto', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource();

  constructor ( 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, 
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    this.listarImoveis();
  }

  listarImoveis(): void {
    this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
      this.dataSource.data = data;
    });
  }

  modalAdicionar(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AdicionarImovel, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  modalEditar(imovelId: string,  enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(EditarImovel, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: imovelId
    });
  }

  deletarImovel(imovelId: string): void {
    this.http.delete('http://localhost:3000/imoveis/' + imovelId).subscribe(response => {
      this._snackBar.open('O imóvel foi removido!', 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      this.listarImoveis();
    },
    error => {
      this._snackBar.open('Ocorreu um erro ao remover o imovel ' + error, 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
    });
  }

  toggleFavorito(imovelId: string): void {
    this.http.get<any>('http://localhost:3000/imoveis/' + imovelId).subscribe(data => {

      this.imovel = data;

      this.imovel.favorito = !this.imovel.favorito;
      this.http.patch('http://localhost:3000/imoveis/' + imovelId, { favorito: this.imovel.favorito })
        .subscribe(
          response => {
            // console.log('Property favorito status updated successfully:', response);
            if (this.imovel.favorito === true) {
              this._snackBar.open('O imóvel foi favoritado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            } else {
              this._snackBar.open('O imóvel foi removido dos favoritos...', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }

            this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
              this.dataSource.data = data;
            });
          },
          error => {
            // console.error('Error updating property favorito status:', error);
              this._snackBar.open('Ocorreu um erro ao favoritar/desfavoritar o imóvel!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
              // Revert the 'favorito' value if the update fails
              this.imovel.favorito = !this.imovel.favorito;
            } 
            
      );
    });

  }

  filtrarImovel(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

@Component({
  selector: 'adicionar-imovel',
  templateUrl: './adicionar-imovel.html',
  styleUrls: ['./modal.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
})

export class AdicionarImovel {

  titulo: string;
  descricao: string;
  descricao2: string;
  foto: string;
  quartos: number;
  banheiros: number;
  area: number;
  preco: number;
  favorito: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdicionarImovel>
  ) {}

  adicionarImovel() {
    const novoImovel = {
      titulo: this.titulo,
      descricao: this.descricao,
      descricao2: this.descricao2,
      foto: this.foto,
      quartos: this.quartos,
      banheiros: this.banheiros,
      area: this.area,
      preco: this.preco,
      favorito: false,
    };

    this.http.post(' http://localhost:3000/imoveis', novoImovel)
      .subscribe(
        (response) => {
          this._snackBar.open('Imóvel cadastrado com sucesso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        },
        (error) => {
          console.error('Erro ao cadastrar imóvel:', error);
          this._snackBar.open('Erro ao cadastrar imóvel!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        }
    );
  }
}

@Component({
  selector: 'editar-imovel',
  templateUrl: './editar-imovel.html',
  styleUrls: ['./modal.scss'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
})

export class EditarImovel implements OnInit {

  imovel: any = {};

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdicionarImovel>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {} 

    ngOnInit(): void {
      this.http.get<any>('http://localhost:3000/imoveis/' + this.data).subscribe(response => {
        this.imovel = response;
      });
    }

    editarImovel() {
      const dadosImovel = {
        titulo: this.imovel.titulo,
        descricao: this.imovel.descricao,
        descricao2: this.imovel.descricao2,
        foto: this.imovel.foto,
        quartos: this.imovel.quartos,
        banheiros: this.imovel.banheiros,
        area: this.imovel.area,
        preco: this.imovel.preco,
        favorito: this.imovel.favorito,
      }

      this.http.patch('http://localhost:3000/imoveis/' + this.data, dadosImovel )
      .subscribe(
        (response) => {
          this._snackBar.open('Imóvel alterado com sucesso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        },
        (error) => {
          console.error('Erro ao alterar imóvel:', error);
          this._snackBar.open('Erro ao cadastrar imóvel!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        }
      );
    }
}