import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingService } from './global-loading.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth-service';

export interface Sensor {
  nome: string;
  mac: string;
  localizacao?: string;
  tipo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private baseUrl = 'https://alertaseguro-backend.onrender.com';

  constructor(
    private http: HttpClient,
    private loading: GlobalLoadingService,
    private auth: AuthService
  ) {}

  async addSensor(sensor: Sensor) {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('Usuário não logado');

    this.loading.show();

    try {
      const req = this.http.post(`${this.baseUrl}/esp/register`, {
        uid: user.uid,
        mac: sensor.mac,
        nome: sensor.nome,
        localizacao: sensor.localizacao || '',
        tipo: sensor.tipo || ''
      });

      return await firstValueFrom(req);
    } finally {
      this.loading.hide();
    }
  }

  async getSensores() {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('Usuário não logado');

    this.loading.show();

    try {
      const req = this.http.get<any[]>(`${this.baseUrl}/users/${user.uid}/esp/list`);
      return await firstValueFrom(req);
    } finally {
      this.loading.hide();
    }
  }

  async deleteSensor(mac: string) {
    const user = this.auth.getCurrentUser();
    if (!user) throw new Error('Usuário não logado');

    this.loading.show();
    try {
      const req = this.http.delete(`${this.baseUrl}/esp/${user.uid}/${mac}`);
      return await firstValueFrom(req);
    } finally {
      this.loading.hide();
    }
  }
}
