import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service'; // <-- ADICIONE

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage {

  constructor(
    private router: Router,
    private auth: AuthService // <-- INJETAR O SERVICE
  ) {}

  async logout() {
    console.log('Usuário saiu.');

    // 🔥 limpa UID/email do localStorage
    await this.auth.signOut();

    // 🔥 impede voltar para a Home
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
