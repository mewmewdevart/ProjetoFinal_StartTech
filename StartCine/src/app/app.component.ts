<<<<<<< HEAD
import { Component } from '@angular/core';
import { ComunicacaoService } from './comunicacao.service';
=======
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> origin/edu-login-cadastro

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
<<<<<<< HEAD
export class AppComponent {
	title = 'StartCine+';

	constructor(public comunicacaoService: ComunicacaoService) {}
=======
export class AppComponent implements DoCheck {
  title = 'startFilmes';
  ismenurequired=false;
  constructor(private router:Router){

  }
  ngDoCheck(): void {
    let  currenturl=this.router.url;
    if(currenturl=='/login' || currenturl=='/register'){
      this.ismenurequired=false;
      }else{
        this.ismenurequired=true;
      }
  }
>>>>>>> origin/edu-login-cadastro
}
