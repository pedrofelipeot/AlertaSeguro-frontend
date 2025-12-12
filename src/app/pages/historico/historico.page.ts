import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event-service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';

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
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    const user = await this.auth.getCurrentUser();

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.userId = user.uid;

    this.route.paramMap.subscribe(params => {
      const macParam = params.get('mac');

      if (!macParam) {
        this.errorMsg = 'MAC do dispositivo não fornecido.';
        this.loading = false;
        return;
      }

      // 🔥 Ajuste crítico — padroniza o MAC
      this.mac = decodeURIComponent(macParam).toLowerCase().trim();

      console.log("📡 MAC recebido da rota:", this.mac);

      this.loadEvents();
    });
  }

  loadEvents() {
    this.loading = true;

    console.log("🔑 UID usado:", this.userId);
    console.log("🔌 MAC usado na requisição:", this.mac);

    this.eventService.getEvents(this.userId!, this.mac).subscribe({
      next: (resp: any) => {
        console.log("📥 Resposta do backend:", resp);

        if (resp?.events && Array.isArray(resp.events)) {
          this.events = resp.events;
        } else if (Array.isArray(resp)) {
          this.events = resp;
        } else {
          this.events = [];
        }

        if (this.events.length > 0) {
          this.espName = this.events[0].deviceName || this.espName;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error("❌ Erro ao buscar eventos:", err);
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

  async removerEvento(eventId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: 'Deseja realmente deletar esta notificação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Deletar',
          handler: async () => {
            try {
              await this.eventService.deleteEvent(this.userId!, this.mac, eventId);
              this.events = this.events.filter(e => e.id !== eventId);
            } catch (err) {
              console.error('❌ Erro ao deletar notificação:', err);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
