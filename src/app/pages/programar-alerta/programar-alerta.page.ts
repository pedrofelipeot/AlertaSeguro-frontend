import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  IonButton,
  IonIcon
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-programar-alerta',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // NECESSÁRIO PARA ngModel
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // <<=== ESSENCIAL PARA HttpClient funcionar

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

    IonButton,
  ],
  templateUrl: './programar-alerta.page.html',
  styleUrls: ['./programar-alerta.page.scss'],
})
export class ProgramarAlertaPage implements OnInit {

  backendUrl = "https://alertaseguro-backend.onrender.com";

  model: any = {
    startTime: "",
    endTime: "",
    dias: [],
    device: ""
  };

  diasSemana = [
    { id: 0, nome: 'Domingo' },
    { id: 1, nome: 'Segunda' },
    { id: 2, nome: 'Terça' },
    { id: 3, nome: 'Quarta' },
    { id: 4, nome: 'Quinta' },
    { id: 5, nome: 'Sexta' },
    { id: 6, nome: 'Sábado' }
  ];

  devices: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDevices();
  }

  async loadDevices() {
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    try {
      this.devices = await this.http
        .get<any[]>(`${this.backendUrl}/users/${uid}/esp/list`)
        .toPromise() || [];
    } catch (e) {
      console.error("Erro ao carregar dispositivos:", e);
    }
  }

  maskTime(event: any) {
    let val = event.target.value.replace(/\D/g, "");
    if (val.length > 2) val = val.slice(0, 2) + ":" + val.slice(2, 4);
    event.target.value = val;
    this.model[event.target.name] = val;
  }

  isFormValid() {
    return (
      this.model.startTime &&
      this.model.endTime &&
      this.model.device &&
      this.model.dias.length > 0
    );
  }

  async scheduleAlert() {

  const mac = this.model.device;

  const body = {
    inicio: this.model.startTime,
    fim: this.model.endTime,
    dias: this.model.dias.map((d: any) => Number(d)), // 🔥 FIX
    ativo: true
  };

  try {
    await this.http
      .post(`${this.backendUrl}/esp/${mac}/horarios`, body)
      .toPromise();

    alert("Horário salvo com sucesso!");
    history.back();

  } catch (e) {
    console.error("Erro ao salvar horário:", e);
    alert("Erro ao salvar horário.");
  }
}

}
