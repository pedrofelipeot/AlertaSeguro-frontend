import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../services/sensor-service';
import { 
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  AlertController
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton
  ]
})
export class SensoresPage implements OnInit {

  sensores: any[] = [];

  constructor(
    private sensorService: SensorService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.carregarSensores();
  }

  async carregarSensores() {
    try {
      this.sensores = await this.sensorService.getSensores();
    } catch (err) {
      console.error('Erro ao carregar sensores:', err);
    }
  }

  async atualizar(event: any) {
    await this.carregarSensores();
    event.target.complete();
  }

  // 🔹 Função para deletar sensor com confirmação
  async removerSensor(mac: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Deseja realmente deletar este sensor?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          handler: async () => {
            try {
              await this.sensorService.deleteSensor(mac);
              // Atualiza lista local
              this.sensores = this.sensores.filter(s => s.mac !== mac);
            } catch (err) {
              console.error('Erro ao deletar sensor:', err);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
