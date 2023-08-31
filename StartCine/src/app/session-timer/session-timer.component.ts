import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.scss']
})
export class SessionTimerComponent implements OnInit, OnDestroy {
  timerObservable: Observable<number>;
  timerSubscription: Subscription;
  timePassed: number = 0; // Tempo em segundos
  alertWarning: boolean = false;
  alertDanger: boolean = false;
  alertMessage: string;

  constructor() { }

  ngOnInit(): void {
    // Cria um Observable que emite um valor após um determinado período de tempo
    this.timerObservable = timer(0, 1000); // Emitir a cada segundo

    // Inscreve-se no Observable e realiza ações com base no tempo
    this.timerSubscription = this.timerObservable.subscribe(() => {
      this.timePassed++;

      if (this.timePassed === 60) {
        this.handleLogout();
      } else if (this.timePassed === 45) {
        this.showDanger("Você será deslogado em 15 segundos!");
      } else if (this.timePassed === 30) {
        this.showWarning('Sua sessão está prestes a expirar!');
      }
    });
  }

  ngOnDestroy(): void {
    // Cancela a inscrição no Observable ao destruir o componente
    this.timerSubscription.unsubscribe();
  }

  showWarning(message: string): void {
    this.alertWarning = true;
    this.alertMessage = message;  
  }

  showDanger(message: string): void {
    this.alertWarning = false;
    this.alertDanger = true;
    this.alertMessage = message;  
  }

  handleLogout(): void {
    alert('Sessão expirada. Realizando logout...');
    // Chame sua função de logout aqui
  }
}

