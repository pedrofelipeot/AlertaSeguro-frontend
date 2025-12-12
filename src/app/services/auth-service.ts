import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

export interface UsuarioAuth {
  uid: string;
  email: string;
  name: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://alertaseguro-backend.onrender.com';

  constructor() {}

  // =============================
  // LOGIN NORMAL
  // =============================
  async signIn(email: string, password: string) {
    const response = await CapacitorHttp.post({
      url: `${this.baseUrl}/auth/login`,
      headers: { 'Content-Type': 'application/json' },
      data: { email, password },
      webFetchExtra: { mode: 'cors' }
    });

    const data = response.data;

    if (!data || data.error || !data.uid) {
      throw new Error(data?.message || 'Credenciais inválidas');
    }

    this.saveUser({
      uid: data.uid,
      email: data.email,
      name: data.nome || '',
      photo: data.photoURL || ''
    });

    return data;
  }

  // =============================
  // CADASTRO
  // =============================
  async signUp(email: string, password: string, nome: string) {
    const response = await CapacitorHttp.post({
      url: `${this.baseUrl}/auth/register`,
      headers: { 'Content-Type': 'application/json' },
      data: { email, password, nome },
      webFetchExtra: { mode: 'cors' }
    });

    const data = response.data;

    if (!data || !data.uid) {
      throw new Error(data?.message || 'Erro ao cadastrar');
    }

    this.saveUser({
      uid: data.uid,
      email,
      name: nome,
      photo: ''
    });

    return data;
  }

  // =============================
  // GOOGLE LOGIN
  // =============================
  async signInWithGoogle() {
    const result = await GoogleAuth.signIn();
    const idToken = result.authentication.idToken;

    const response = await CapacitorHttp.post({
      url: `${this.baseUrl}/auth/google`,
      headers: { 'Content-Type': 'application/json' },
      data: { idToken },
      webFetchExtra: { mode: 'cors' }
    });

    const data = response.data;

    const photo = data.photoURL || result?.imageUrl || '';

    this.saveUser({
      uid: data.uid,
      email: data.email,
      name: data.nome || data.displayName || '',
      photo
    });

    return data;
  }

  // =============================
  // SALVAR USUÁRIO LIMPO
  // =============================
  private saveUser(user: UsuarioAuth) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // =============================
  // OBTER USUÁRIO ATUAL
  // =============================
  getCurrentUser(): UsuarioAuth | null {
    const stored = localStorage.getItem('user');
    if (!stored) return null;

    return JSON.parse(stored);
  }

  getUid(): string | null {
    const user = this.getCurrentUser();
    return user?.uid || null;
  }

  // =============================
  // LOGOUT COMPLETO
  // =============================
  async signOut() {
    localStorage.clear(); // 🔥 limpa TUDO
  }

  // =============================
  // FOTO
  // =============================
  getUserPhoto(): string {
    const user = this.getCurrentUser();
    return user?.photo || '';
  }

  // =============================
  // AVATAR COM INICIAIS
  // =============================
  getUserInitialsAvatar(): { initials: string, color: string } {
    const user = this.getCurrentUser();

    const name = user?.name || 'Usuário';
    const words = name.trim().split(' ');
    let initials = words.length === 1 ? words[0][0] : words[0][0] + words[words.length - 1][0];
    initials = initials.toUpperCase();

    const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFC75F', '#845EC2', '#FF9671'];
    const color = colors[name.charCodeAt(0) % colors.length];

    return { initials, color };
  }
}
