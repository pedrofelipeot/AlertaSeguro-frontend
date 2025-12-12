import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth-service';
import { GlobalLoadingService } from '../../services/global-loading.service'; // 👈

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon
  ],
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private globalLoading: GlobalLoadingService // 👈
  ) {}

  async onSignUp() {

    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    this.globalLoading.show(); // 🔥 loading global

    try {
      await this.auth.signUp(this.email, this.password, this.name);
      alert('Conta criada com sucesso!');
      this.router.navigate(['/login']);
    } catch (err: any) {
      console.error('Erro ao criar conta:', err);
      alert('Erro ao criar conta: ' + (err.message || err));
    } finally {
      this.globalLoading.hide(); // 🔥 esconde
    }
  }

  async loginGoogle() {
    this.globalLoading.show(); // 🔥 loading global

    try {
      await this.auth.signInWithGoogle();
      this.router.navigateByUrl('/home');
    } catch (err) {
      console.error('Erro no login com Google:', err);
      alert('Erro ao entrar com Google.');
    } finally {
      this.globalLoading.hide();
    }
  }
}
