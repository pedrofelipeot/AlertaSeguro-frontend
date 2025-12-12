import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

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
  IonSpinner
} from "@ionic/angular/standalone";

import { AuthService } from '../../services/auth-service';
import { GlobalLoadingService } from '../../services/global-loading.service'; 
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-programar-alerta',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

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
    IonSpinner
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
  userUid: string | null = null;

  enviando = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private loading: GlobalLoadingService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await this.auth.getCurrentUser();

    if (user) {
      this.userUid = user.uid;
      await this.loadDevices();
    } else {
      console.warn("⚠ Nenhum usuário logado!");
      this.presentToast("Usuário não autenticado", "danger");
    }
  }

  async loadDevices() {
    if (!this.userUid) return;

    this.loading.show(); 

    try {
      this.devices = await firstValueFrom(
        this.http.get<any[]>(`${this.backendUrl}/users/${this.userUid}/esp/list`)
      );
    } catch (e) {
      console.error("Erro ao carregar dispositivos:", e);
      this.presentToast("Erro ao carregar dispositivos.", "danger");
    } finally {
      this.loading.hide(); 
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

    if (!this.isFormValid()) {
      this.presentToast("Preencha todos os campos corretamente.", "danger");
      return;
    }

    if (!this.userUid) {
      this.presentToast("Usuário não identificado.", "danger");
      return;
    }

    const mac = this.model.device;

    const body = {
      inicio: this.model.startTime,
      fim: this.model.endTime,
      dias: this.model.dias.map((d: any) => Number(d)),
      ativo: true
    };

    this.enviando = true;
    this.loading.show();

    try {

      const url = `${this.backendUrl}/esp/${this.userUid}/${encodeURIComponent(mac)}/horarios`;

      console.log("📡 Enviando para:", url);
      console.log("📦 Body:", body);

      await firstValueFrom(
        this.http.post(url, body)
      );

      this.presentToast("Alerta programado com sucesso!", "success");

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 800);

    } catch (e) {
      console.error("❌ Erro ao salvar horário:", e);
      this.presentToast("Erro ao salvar alerta.", "danger");
    } finally {
      this.enviando = false;
      this.loading.hide();
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
