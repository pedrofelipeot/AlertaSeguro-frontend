import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EventService } from '../services/event-service';
import { getAuth } from 'firebase/auth';

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

  userId = '';
  mac = '';
  events: any[] = [];
  lastEvent: any = null;
  espDevices: any[] = [];

  private baseUrl = 'https://alertaseguro-backend.onrender.com';

  constructor(
    private router: Router,
    private http: HttpClient,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const auth = getAuth();
    this.userId = auth.currentUser?.uid ?? '';

    if (this.userId) {
      this.loadEspDevices();
    }
  }

  // ✔ CORRIGIDO — rota certa do backend
  loadEspDevices() {
    const url = `${this.baseUrl}/users/${this.userId}/esp/list`;

    this.http.get<any[]>(url).subscribe({
      next: (devices) => {
        console.log('Dispositivos:', devices);

        this.espDevices = devices;

        if (devices.length > 0) {
          this.mac = devices[0].mac;  
          this.loadEvents();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dispositivos:', err);
      }
    });
  }

  loadEvents() {
    console.log('📌 Buscando eventos do ESP:', this.mac, 'User:', this.userId);

    if (!this.mac || !this.userId) {
      console.log('❌ mac ou userId vazio');
      return;
    }

    this.eventService.getEvents(this.userId, this.mac).subscribe({
      next: (data) => {
        console.log('Eventos recebidos:', data);
        this.events = data;
        this.lastEvent = data.length > 0 ? data[0] : null;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
      }
    });
  }

  goToMenu() {
    this.router.navigateByUrl('/menu');
  }
}
