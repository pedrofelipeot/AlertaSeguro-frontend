// src/app/services/sensor.service.ts
import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  private normalizeId(id: string) {
    return id ? id.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() : '';
  }

  /** Adicionar sensor */
  async addSensor(sensor: { nome: string; localizacao?: string; tipo?: string; mac: string }) {
    const user: User | null = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const sensorId = this.normalizeId(sensor.mac);
    if (!sensorId) throw new Error('MAC/ID inválido');

    const docRef = doc(this.firestore, `users/${user.uid}/sensors/${sensorId}`);
    const snap = await getDoc(docRef);

    if (snap.exists()) throw new Error('Sensor já cadastrado por você');

    const payload = {
      id: sensorId,
      nome: sensor.nome,
      localizacao: sensor.localizacao || null,
      tipo: sensor.tipo || null,
      mac: sensor.mac,
      userId: user.uid,
      status: 'ativo',
      createdAt: serverTimestamp(),
      ultimoEvento: null
    };

    await setDoc(docRef, payload);
    return payload;
  }

  /** Pegar sensor do usuário pelo MAC */
  async getSensorByMac(mac: string) {
    const user: User | null = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado');

    const sensorId = this.normalizeId(mac);
    const docRef = doc(this.firestore, `users/${user.uid}/sensors/${sensorId}`);
    const snap = await getDoc(docRef);

    return snap.exists() ? snap.data() : null;
  }
}
