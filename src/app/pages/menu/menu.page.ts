import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  mac: string = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // 🔥 pegar MAC salvo pelo home
    this.mac = localStorage.getItem('selected_mac') || '';

    if (!this.mac) {
      console.warn('⚠ Nenhum MAC selecionado.');
    } else {
      console.log('📡 MAC carregado no Menu:', this.mac);
    }
  }

  async logout() {
    console.log('Usuário saiu.');
    await this.auth.signOut();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goToHorarios() {
    if (!this.mac) {
      console.warn('Nenhum MAC selecionado.');
      return;
    }

    const encoded = encodeURIComponent(this.mac);
    this.router.navigate(['/horarios', encoded]);
  }

}
