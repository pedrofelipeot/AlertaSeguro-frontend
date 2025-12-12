import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton,
  IonInput, IonLabel, IonItem, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSpinner, IonToast, ToastController
} from '@ionic/angular/standalone';

import { SensorService } from '../../services/sensor-service';
import { GlobalLoadingService } from '../../services/global-loading.service';

@Component({
  selector: 'app-cadastrar-sensor',
  standalone: true,
  imports: [
    IonSpinner,
    IonCardContent, IonCardTitle, IonCardHeader, IonCard,
    IonIcon, CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonInput, IonLabel, IonItem
  ],
  templateUrl: './cadastrar-sensor.page.html',
  styleUrls: ['./cadastrar-sensor.page.scss']
})
export class CadastrarSensorPage {

  sensor = { nome: '', localizacao: '', tipo: '', mac: '' };
  enviando = false; 

  // Variáveis para toast
  toastMessage = '';
  showToast = false;
  toastColor: 'success' | 'danger' = 'success';

  constructor(
    private sensorService: SensorService,
    private router: Router,
    private loadingService: GlobalLoadingService,
    private toastController: ToastController
  ) {}

  async cadastrarSensor() {
    if (!this.sensor.nome || !this.sensor.mac) {
      this.presentToast('Preencha pelo menos Nome e MAC/ID do sensor.', 'danger');
      return;
    }

    this.enviando = true;
    this.loadingService.show();

    try {
      await this.sensorService.addSensor(this.sensor);
      this.presentToast('Sensor cadastrado com sucesso!', 'success');
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.presentToast('Erro ao cadastrar sensor: ' + (err.message || err), 'danger');
    } finally {
      this.enviando = false;
      this.loadingService.hide();
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
      icon: color === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline',
      cssClass: 'custom-toast'
    });
    toast.present();
  }
}
