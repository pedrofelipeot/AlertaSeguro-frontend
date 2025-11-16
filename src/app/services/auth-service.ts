import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ Sempre usar HTTPS e evitar redirecionamentos
  private baseUrl = 'https://alertaseguro-backend.onrender.com'; 

  constructor() {}

  // ======================
  // Registro
  // ======================
  async signUp(email: string, password: string, nome: string) {
    try {
      console.log('Tentando registrar em:', `${this.baseUrl}/auth/register`);

      const response = await CapacitorHttp.post({
        url: `${this.baseUrl}/auth/register`,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: { email, password, nome },
        webFetchExtra: {
          mode: 'cors' // ✅ Ajuda em PWA e apps híbridos
        },
        connectTimeout: 10000, // 10 segundos
        readTimeout: 10000
      });

      const data = response.data;
      console.log('Registro bem-sucedido:', data);

      localStorage.setItem('uid', data.uid);
      localStorage.setItem('email', email);

      return data;
    } catch (error: any) {
      console.error('Erro completo no registro:', JSON.stringify(error));
      throw new Error(error.error?.message || 'Erro ao cadastrar usuário');
    }
  }

  // ======================
  // Login
  // ======================
  async signIn(email: string, password: string) {
    try {
      console.log('Tentando login em:', `${this.baseUrl}/auth/login`);

      const response = await CapacitorHttp.post({
        url: `${this.baseUrl}/auth/login`,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: { email, password },
        webFetchExtra: {
          mode: 'cors'
        },
        connectTimeout: 10000,
        readTimeout: 10000
      });

      const data = response.data;
      console.log('Login bem-sucedido:', data);

      localStorage.setItem('uid', data.uid);
      localStorage.setItem('email', data.email);

      return data;
    } catch (error: any) {
      console.error('Erro completo no login:', JSON.stringify(error));
      throw new Error(error.error?.message || 'Erro ao logar usuário');
    }
  }

  // ======================
  // Logout
  // ======================
  async signOut() {
    localStorage.removeItem('uid');
    localStorage.removeItem('email');
  }

  // ======================
  // Retorna apenas o UID
  // ======================
  getUid() {
    return localStorage.getItem('uid');
  }

  // ======================
  // Retorna o usuário atual (uid + email)
  // ======================
  async getCurrentUser() {
    const uid = localStorage.getItem('uid');
    const email = localStorage.getItem('email');
    if (!uid) return null;
    return { uid, email };
  }
}
