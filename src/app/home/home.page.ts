import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventService } from '../services/event-service';
import { AuthService } from '../services/auth-service';
import { GlobalLoadingService } from '../services/global-loading.service';

import { Subscription, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  loadingHome = true;

  devicesLoaded = false;
  eventsLoaded = false;

  userId = '';
  mac = '';
  espName = '';

  events: any[] = [];
  lastEvent: any = null;
  espDevices: any[] = [];
  hasDevices = false;

  private baseUrl = 'https://alertaseguro-backend.onrender.com';
  private backendPingSub?: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient,
    private eventService: EventService,
    private auth: AuthService,
    private loading: GlobalLoadingService
  ) {}

  async ngOnInit() {
    this.loadingHome = true;
    this.devicesLoaded = false;
    this.eventsLoaded = false;
    this.hasDevices = false;

    this.wakeBackend();
    await this.loadUser();
  }

  ngOnDestroy() {
    this.backendPingSub?.unsubscribe();
  }

  async loadUser() {
    const user = await this.auth.getCurrentUser();

    if (!user || !user.uid) {
      this.finishLoading();
      return;
    }

    this.userId = user.uid;
    this.loadEspDevices();
  }

  // Wake backend
  wakeBackend() {
    this.backendPingSub = this.http.get(`${this.baseUrl}/ping`).pipe(
      timeout(5000),
      catchError(() => of(null))
    ).subscribe(() => {});
  }

  loadEspDevices() {
    const url = `${this.baseUrl}/users/${this.userId}/esp/list`;

    this.http.get<any[]>(url).subscribe({
      next: (devices) => {
        this.devicesLoaded = true;
        this.espDevices = devices;
        this.hasDevices = devices.length > 0;

        if (!this.hasDevices) {
          this.finishLoading();
          return;
        }

        // pega o primeiro ESP
        const firstDevice = devices[0];
        this.mac = firstDevice.mac.trim().toLowerCase();
        this.espName = firstDevice.nome || "Sensor";

        // salva o MAC globalmente
        this.eventService.setSelectedMac(this.mac);

        // Carregar eventos
        this.loadEvents();
      },

      error: () => {
        this.devicesLoaded = true;
        this.finishLoading();
      }
    });
  }

  loadEvents() {
    if (!this.userId || !this.mac) {
      this.eventsLoaded = true;
      this.finishLoading();
      return;
    }

    // 🔥 PATH AJUSTADO (minúsculo):
    this.eventService.getEvents(this.userId, this.mac).subscribe({
      next: (resp) => {
        this.eventsLoaded = true;

        console.log("📥 EVENTOS RECEBIDOS DO BACKEND:", resp);

        this.events = resp.slice(0, 3);
        this.lastEvent = resp.length > 0 ? resp[0] : null;

        this.finishLoading();
      },

      error: () => {
        this.eventsLoaded = true;
        this.finishLoading();
      }
    });
  }

  finishLoading() {
    if (!this.devicesLoaded) return;
    if (this.hasDevices && !this.eventsLoaded) return;

    this.loadingHome = false;
  }

  goToHistorico(mac: string) {
    this.router.navigate(['/historico', mac]);
  }

  goToMenu() {
    this.router.navigateByUrl('/menu');
  }

  goToAddDevice() {
    this.router.navigateByUrl('/cadastrar-sensor');
  }
}
