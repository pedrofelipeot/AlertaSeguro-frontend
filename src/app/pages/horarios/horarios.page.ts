import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HorariosService } from '../../services/horarios.service';
import { HttpClientModule } from '@angular/common/http';

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

  userId: string | null = null;
  mac: string = '';
  espName: string = '';
  horarios: any[] = [];
  loading = true;
  errorMsg: string | null = null;

  diasSemana: Record<number, string> = {
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
    7: "Domingo"
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private horariosService: HorariosService
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

      console.log('📡 MAC recebido (encoded):', macParam);

      this.mac = decodeURIComponent(macParam);
      console.log('📡 MAC decodificado:', this.mac);

      this.loadHorarios();
    });
  }

  loadHorarios() {
    if (!this.userId) return;

    this.loading = true;
    this.errorMsg = null;

    this.horariosService.getHorarios(this.userId, this.mac).subscribe({
      next: (resp: any[]) => {
        console.log('✅ Horários recebidos:', resp);

        this.horarios = resp;

        if (this.horarios.length > 0) {
          this.espName = this.horarios[0].deviceName || '';
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erro ao carregar horários:', err);
        this.errorMsg = 'Erro ao carregar horários.';
        this.loading = false;
      }
    });
  }

  formatDias(dias: any[]): string {
    if (!Array.isArray(dias)) return '';

    return dias
      .map(d => this.diasSemana[d] || d)
      .join(', ');
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}
