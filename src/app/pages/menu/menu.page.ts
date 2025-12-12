import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { EventService } from '../../services/event-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  mac: string = '';

  userName: string = '';
  userEmail: string = '';
  userPhoto: string | null = null;
  userInitials: { initials: string, color: string } = { initials: '', color: '#999' };

  constructor(
    private router: Router,
    private auth: AuthService,
    private eventService: EventService
  ) {}

  async ngOnInit() {
    const user = await this.auth.getCurrentUser();

    this.userName = user?.name || 'Usuário';
    this.userEmail = user?.email || '';
    this.userPhoto = user?.photo || null;
    this.userInitials = this.auth.getUserInitialsAvatar();

    // Atualiza o MAC selecionado
    this.updateMac();

    // Escuta mudanças de seleção de sensor
    this.eventService.macChanged$.subscribe(() => {
      this.updateMac();
    });
  }

  updateMac() {
    this.mac = this.eventService.getSelectedMac();
    console.log('📡 MAC carregado no Menu:', this.mac);
  }

  async logout() {
    console.log('Usuário saiu.');
    await this.auth.signOut();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  goToHorarios() {
    if (!this.mac) {
      this.router.navigate(['/horarios']); // rota sem MAC
      return;
    }

    const encoded = encodeURIComponent(this.mac);
    this.router.navigate(['/horarios', encoded]); // rota com MAC
  }

  onImageError() {
    this.userPhoto = null;
  }
}
