import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { GlobalLoadingService } from '../../services/global-loading.service'; // 👈

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';
  loading = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private globalLoading: GlobalLoadingService // 👈
  ) {}

  ngOnInit() {
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
  }

  async fazerLogin() {
    this.loading = true;
    this.globalLoading.show(); // 🔥 loading global

    try {
      await this.auth.signIn(this.email, this.password);
      this.router.navigateByUrl('/home');
    } catch (err) {
      console.error('Login falhou:', err);
      alert('Email ou senha incorretos.');
    } finally {
      this.loading = false;
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

  goBack() {
    this.router.navigate(['/welcome'], { replaceUrl: true });
  }
}
