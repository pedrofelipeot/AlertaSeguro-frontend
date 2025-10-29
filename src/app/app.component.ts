import { Component, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { AuthService } from '../app/services/auth-service';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class AppComponent implements OnInit {

  backendUrl = 'https://alertaseguro-backend.onrender.com';
  sensorId = '004b122e188c'; // Seu sensor fixo

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    console.log('Iniciando app...');

    const permResult = await PushNotifications.requestPermissions();
    console.log('Permissão push:', permResult);

    if (permResult.receive !== 'granted') {
      console.warn('Permissão de push não concedida');
      return;
    }

    await PushNotifications.register();

    PushNotifications.addListener('registration', async (token) => {
      console.log('Token FCM:', token.value);

      let userId = this.authService.getCurrentUserId();
      console.log('UserID retornado pelo AuthService:', userId);

      if (!userId) {
        console.warn('Nenhum userId encontrado, usando fallback de teste');
        userId = 'fwNnZSbMJ2g2XokMimLaIJ0JQBA3';
      }

      try {
        console.log('Enviando token para backend:', {
          userId,
          sensorId: this.sensorId,
          token: token.value
        });

        await this.http.post(`${this.backendUrl}/register-token`, {
          userId,
          sensorId: this.sensorId,
          token: token.value
        }).toPromise();

        console.log('Token enviado com sucesso!');
      } catch (err) {
        console.error('Erro ao registrar token no backend:', err);
      }
    });

    PushNotifications.addListener('registrationError', (error) => {
      console.error('Erro ao registrar push:', error);
    });
  }

  logout() {
    console.log("Logout acionado");
  }
}
