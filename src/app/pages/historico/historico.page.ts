import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-historico',
  standalone: true,
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class HistoricoPage implements OnInit {

  userId: string | null = null;
  mac: string = '';
  espName: string = '';
  events: any[] = [];
  loading = true;
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('uid');
    if (!this.userId) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.route.paramMap.subscribe(params => {
      const macParam = params.get('mac');
      if (!macParam) {
        this.errorMsg = 'MAC do dispositivo não fornecido.';
        this.loading = false;
        return;
      }
      this.mac = decodeURIComponent(macParam);
      this.loadEvents();
    });
  }

  loadEvents() {
    this.loading = true;

    this.eventService.getEvents(this.userId!, this.mac).subscribe({
      next: (resp: any) => {
        this.events = Array.isArray(resp) ? resp : (resp.events || []);
        if (this.events.length > 0) {
          this.espName = this.events[0].deviceName || this.espName;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Erro ao carregar eventos.';
        this.loading = false;
      }
    });
  }

  formatMessage(e: any) {
    if (!e || !e.mensagem) return '';
    if (e.deviceName) {
      const prefix = `${e.deviceName}: `;
      if (e.mensagem.startsWith(prefix)) {
        return e.mensagem.replace(prefix, '');
      }
    }
    return e.mensagem;
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
