import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
    private authService: AuthService) {
    authService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  
}
