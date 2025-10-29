import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onSignIn() {
    try {
      await this.auth.signIn(this.email, this.password);
      alert('Logado com sucesso!');
      this.router.navigate(['/home']); 
    } catch (err: any) {
      alert('Erro ao logar: ' + (err.message || err));
    }
  }

  async onLogout() {
    await this.auth.signOut();
    alert('Logout feito com sucesso!');
  }
}
