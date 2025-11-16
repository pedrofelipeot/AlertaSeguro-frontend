import { Injectable } from '@angular/core';

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

  private baseUrl = 'https://alertaseguro-backend.onrender.com'; // endereço do backend

  constructor() {}

  /**
   * Adiciona um sensor na subcoleção de ESPs do usuário logado
   */
  async addSensor(sensor: Sensor) {
    const uid = localStorage.getItem('uid'); // UID do usuário logado
    if (!uid) {
      throw new Error('Usuário não logado');
    }

    const response = await fetch(`${this.baseUrl}/esp/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        mac: sensor.mac,
        nome: sensor.nome,
        localizacao: sensor.localizacao || '',
        tipo: sensor.tipo || ''
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao cadastrar sensor');
    }

    return await response.json();
  }
}
