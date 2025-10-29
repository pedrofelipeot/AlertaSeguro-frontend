import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-programar-alerta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
  ],
  templateUrl: './programar-alerta.page.html',
  styleUrls: ['./programar-alerta.page.scss'],
})
export class ProgramarAlertaPage {
  model: any = {
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    device: ''
  };

  devices = [
    { id: '1', name: 'Dispositivo 1' },
    { id: '2', name: 'Dispositivo 2' },
    { id: '3', name: 'Dispositivo 3' }
  ];

  maskDate(event: any) {
    let val = event.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2);
    if (val.length > 5) val = val.slice(0,5) + '/' + val.slice(5,9);
    event.target.value = val;
    this.model[event.target.name] = val;
  }

  maskTime(event: any) {
    let val = event.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0,2) + ':' + val.slice(2,4);
    event.target.value = val;
    this.model[event.target.name] = val;
  }

  scheduleAlert() {
    console.log('Alerta programado:', this.model);
    alert('Alerta salvo com sucesso!');
  }
}
