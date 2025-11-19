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
  IonLabel
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone: true,
  imports: [
    CommonModule,

    // Ionic standalone components usados no HTML
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
  ]
})
export class SensoresPage implements OnInit {

  sensores: any[] = [];

  constructor(private sensorService: SensorService) {}

  async ngOnInit() {
    await this.carregarSensores();
  }

  async carregarSensores() {
    try {
      this.sensores = await this.sensorService.getSensores();
    } catch (err) {
      console.error(err);
    }
  }

  async atualizar(event: any) {
    await this.carregarSensores();
    event.target.complete();
  }
}
