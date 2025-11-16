import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private authService: AuthService) {}

  async initNotifications() {
    // Verifica se está rodando em um dispositivo real (Android/iOS)
    if (!Capacitor.isNativePlatform()) {
      console.warn('Notificações só funcionam em dispositivos reais.');
      return;
    }

    console.log('🔔 Solicitando permissão para notificações...');
    const perm = await PushNotifications.requestPermissions();

    if (perm.receive === 'granted') {
      await PushNotifications.register();
    } else {
      console.warn('❌ Permissão de notificação negada.');
      return;
    }

    // Quando o dispositivo é registrado com sucesso no FCM
    PushNotifications.addListener('registration', async (token) => {
      console.log('✅ Token FCM recebido:', token.value);

      try {
        // Obtém o usuário autenticado
        const user = await this.authService.getCurrentUser();

        if (!user || !user.uid) {
          console.warn('⚠️ Usuário não autenticado — token não será enviado.');
          return;
        }

        // Envia o token FCM para o backend
        const response = await fetch('https://alertaseguro-backend.onrender.com/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid, token: token.value })
        });

        if (!response.ok) {
          console.error('❌ Falha ao enviar token para o backend:', await response.text());
        } else {
          console.log('✅ Token FCM enviado e salvo no backend.');
        }
      } catch (err) {
        console.error('⚠️ Erro ao enviar token FCM:', err);
      }
    });

    // Listener para quando uma notificação push é recebida (em primeiro plano)
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('📩 Notificação recebida:', notification);
      alert(`${notification.title}\n${notification.body}`);
    });

    // Listener opcional para quando o usuário toca na notificação
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('🔗 Notificação clicada:', notification);
    });
  }
}
