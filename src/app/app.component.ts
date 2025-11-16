import { Component } from '@angular/core';
import { IonicModule, MenuController, Platform } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth-service';
import { NotificationService } from './services/notification-service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {

    // Inicializa status bar e empurra conteúdo para baixo
    this.initializeApp();

    // Suas notificações continuam funcionando
    this.notificationService.initNotifications();
  }

  /** Ajuste da Status Bar para evitar que o HEADER/FOOTER fiquem por baixo do sistema */
  private async initializeApp() {
    await this.platform.ready();

    try {
      // Impede overlay da status bar
      await StatusBar.setOverlaysWebView({ overlay: false });

      // Ajusta cor da status bar — dark combina com header escuro
      await StatusBar.setStyle({ style: Style.Dark });

      console.log('📱 StatusBar ajustada com sucesso!');
    } catch (error) {
      console.warn('⚠️ Erro ao ajustar StatusBar', error);
    }
  }

  async logout() {
    try {
      await this.authService.signOut();
      console.log('🚪 Logout realizado com sucesso!');
      await this.menuCtrl.close('main-menu');
    } catch (err) {
      console.error('❌ Erro ao fazer logout:', err);
    }
  }
}
