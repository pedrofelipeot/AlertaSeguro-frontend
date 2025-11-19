import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventService } from '../services/event-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // 🔥 Nova flag que bloqueia a tela até tudo carregar
  loadingHome = true;

  userId = '';
  mac = '';
  events: any[] = [];
  lastEvent: any = null;

  espName = '';
  espDevices: any[] = [];

  hasDevices = false;

  private baseUrl = 'https://alertaseguro-backend.onrender.com';

  constructor(
    private router: Router,
    private http: HttpClient,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loadingHome = true; // garante que nada apareça antes
    this.loadUser();
  }

  // =====================================================
  // 🔥 CARREGAR USUÁRIO
  // =====================================================
  async loadUser() {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.userId = uid;
    this.loadEspDevices();
  }

  goToHistorico(mac: string) {
    this.router.navigate(['/historico', mac]);
  }

  // =====================================================
  // 🔥 CARREGAR DISPOSITIVOS DO USUÁRIO
  // =====================================================
  loadEspDevices() {
    const url = `${this.baseUrl}/users/${this.userId}/esp/list`;

    this.http.get<any[]>(url)
      .pipe(finalize(() => {})) // loading global trata
      .subscribe({
        next: (devices) => {
          this.espDevices = devices;
          this.hasDevices = devices.length > 0;

          if (!this.hasDevices) {
            // Desbloqueia tela mesmo sem dispositivos
            this.loadingHome = false;
            return;
          }

          this.mac = devices[0].mac.trim();
          this.espName = devices[0].nome || "Sensor";

          localStorage.setItem('selected_mac', this.mac);

          this.loadEvents();
        },
        error: (err) => {
          console.error("❌ Erro ao carregar dispositivos:", err);
          this.loadingHome = false;
        }
      });
  }

  // =====================================================
  // 🔥 CARREGAR EVENTOS
  // =====================================================
  // =====================================================
// 🔥 CARREGAR EVENTOS
// =====================================================
loadEvents() {
  if (!this.userId || !this.mac) {
    this.loadingHome = false;
    return;
  }

  this.eventService.getEvents(this.userId, this.mac)
    .pipe(
      finalize(() => {
        // 👇 Agora só libera a tela quando TUDO terminou
        this.loadingHome = false;
      })
    )
    .subscribe({
      next: (resp) => {

        // 🔥 MANTÉM NOME DO SENSOR (opcional)
        if (resp.length > 0) {
          this.espName = resp[0].deviceName || this.espName;
        }

        // 🔥 SALVA APENAS AS 3 ÚLTIMAS NOTIFICAÇÕES
        this.events = resp.slice(0, 3);

        // 🔥 O último evento REAL segue sendo o primeiro da lista completa
        this.lastEvent = resp.length > 0 ? resp[0] : null;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar eventos:', err);
      }
    });
}


  // Navegação
  goToMenu() {
    this.router.navigateByUrl('/menu');
  }

  goToAddDevice() {
    this.router.navigateByUrl('/cadastro-dispositivo');
  }
}
