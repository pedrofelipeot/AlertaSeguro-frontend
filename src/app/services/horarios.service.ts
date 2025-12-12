import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalLoadingService } from './global-loading.service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class HorariosService {

  private baseUrl = 'https://alertaseguro-backend.onrender.com/esp';

  constructor(
    private http: HttpClient,
    private loading: GlobalLoadingService,
    private auth: AuthService
  ) {}

  // 🔹 LISTAR TODOS OS HORÁRIOS
  async getTodosHorarios() {

    const user = await this.auth.getCurrentUser();

    if (!user || !user.uid) {
      throw new Error('Usuário não logado');
    }

    this.loading.show();

    try {
      const url = `${this.baseUrl}/horarios/${user.uid}`;

      console.log("📡 GET TODOS horários:", url);

      const req = this.http.get<any[]>(url);
      return await firstValueFrom(req);

    } finally {
      this.loading.hide();
    }
  }

  // 🔹 CRIAR HORÁRIO
  async criarHorario(
    mac: string,
    horario: {
      inicio: string;
      fim: string;
      dias: number[];
      ativo?: boolean;
    }
  ) {
    const user = await this.auth.getCurrentUser();

    if (!user || !user.uid) {
      throw new Error('Usuário não logado');
    }

    this.loading.show();

    try {
      const url = `${this.baseUrl}/${user.uid}/${encodeURIComponent(mac)}/horarios`;

      console.log("📡 POST horário:", url);
      console.log("📦 Body:", horario);

      const req = this.http.post(url, horario);
      return await firstValueFrom(req);

    } finally {
      this.loading.hide();
    }
  }

  // 🔹 DELETAR HORÁRIO
  async deleteHorario(mac: string, horarioId: string) {
    const user = await this.auth.getCurrentUser();

    if (!user || !user.uid) {
      throw new Error('Usuário não logado');
    }

    this.loading.show();

    try {
      const url = `${this.baseUrl}/horarios/${user.uid}/${encodeURIComponent(mac)}/${horarioId}`;

      console.log("🗑️ DELETE horário:", url);

      const req = this.http.delete(url);
      return await firstValueFrom(req);

    } finally {
      this.loading.hide();
    }
  }
}
