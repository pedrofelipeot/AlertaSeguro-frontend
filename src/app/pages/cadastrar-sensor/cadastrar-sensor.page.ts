import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonLabel,
  IonItem, 
  IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { SensorService } from '../../services/sensor-service';

@Component({
  selector: 'app-cadastrar-sensor',
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, IonCard, 
    IonIcon,
    CommonModule,
    FormsModule,       
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonInput,
    IonLabel,
    IonItem
  ],
  templateUrl: './cadastrar-sensor.page.html',
  styleUrls: ['./cadastrar-sensor.page.scss']
})
export class CadastrarSensorPage {
  sensor = {
    nome: '',
    localizacao: '',
    tipo: '',
    mac: ''
  };
  loading = false;

  constructor(private sensorService: SensorService, private router: Router) {}

  async cadastrarSensor() {
    if (!this.sensor.nome || !this.sensor.mac) {
      alert('Preencha pelo menos Nome e MAC/ID do sensor.');
      return;
    }

    this.loading = true;
    try {
      await this.sensorService.addSensor(this.sensor); // salva na subcoleção do usuário
      alert('Sensor cadastrado com sucesso!');
      this.router.navigate(['/home']);
    } catch (err: any) {
      alert('Erro ao cadastrar sensor: ' + (err.message || err));
    } finally {
      this.loading = false;
    }
  }
}
