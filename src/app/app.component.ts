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
    this.initializeApp();
    this.notificationService.initNotifications();
  }

  private async initializeApp() {
    await this.platform.ready();

    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setStyle({ style: Style.Dark });

    console.log('✅ App inicializado com Splash automática!');
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
