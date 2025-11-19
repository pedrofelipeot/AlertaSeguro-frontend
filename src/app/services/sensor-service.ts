import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingService } from '../services/global-loading.service';
import { firstValueFrom } from 'rxjs';

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
    private loading: GlobalLoadingService
  ) {}

  /**
   * Adiciona sensor
   */
  async addSensor(sensor: Sensor) {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Usuário não logado');

    this.loading.show();

    try {
      const req = this.http.post(`${this.baseUrl}/esp/register`, {
        uid,
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

  /**
   * Lista sensores
   */
  async getSensores() {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Usuário não logado');

    this.loading.show();

    try {
      const req = this.http.get<any[]>(`${this.baseUrl}/users/${uid}/esp/list`);
      return await firstValueFrom(req);

    } finally {
      this.loading.hide();
    }
  }
}
