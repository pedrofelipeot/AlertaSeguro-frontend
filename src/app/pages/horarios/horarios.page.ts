import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HorariosService } from '../../services/horarios.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    HttpClientModule
  ]
})
export class HorariosPage implements OnInit {

  horarios: any[] = [];
  loading = true;
  errorMsg: string | null = null;

  diasSemana: Record<number, string> = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado"
  };

  constructor(
    private router: Router,
    private horariosService: HorariosService,
    private auth: AuthService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.loadHorarios();
  }

  // ✅ Agora funciona com e sem refresher
  async loadHorarios(event?: any) {

    this.loading = true;
    this.errorMsg = null;

    try {
      const resp = await this.horariosService.getTodosHorarios();

      console.log('✅ Todos horários recebidos:', resp);

      this.horarios = resp.map(h => ({
        ...h,
        docId: h.docId || h.id
      }));

      if (this.horarios.length === 0) {
        this.errorMsg = "Nenhum horário cadastrado.";
      }

    } catch (err) {
      console.error('❌ Erro ao carregar horários:', err);
      this.errorMsg = 'Erro ao carregar horários.';
      this.horarios = [];
    } finally {
      this.loading = false;

      // Finaliza o refresher se tiver sido chamado por ele
      if (event) {
        event.target.complete();
      }
    }
  }

  // ✅ Corrigido para não dar erro no HTML
  formatDias(dias: any[]): string {
    if (!Array.isArray(dias) || dias.length === 0) return '—';

    return dias
      .map(d => this.diasSemana[d] || d)
      .join(', ');
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  // 🔹 DELETAR HORÁRIO
  async removerHorario(horario: any) {

    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: `Deseja realmente deletar este horário do sensor ${horario.deviceName || horario.mac}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          handler: async () => {
            try {
              console.log('🗑️ Deletando horário:', horario);

              await this.horariosService.deleteHorario(horario.mac, horario.docId);

              // remove da tela sem precisar recarregar tudo
              this.horarios = this.horarios.filter(
                h => h.docId !== horario.docId
              );

            } catch (err) {
              console.error('❌ Erro ao deletar horário:', err);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
