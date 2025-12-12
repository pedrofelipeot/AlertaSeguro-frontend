import { Routes } from '@angular/router';
import { AuthGuard } from '../../src/app/guards/auth-guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },

  // ================================
  // Telas públicas (bloqueadas se logado)
  // ================================
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome/welcome.page').then(m => m.WelcomePage),
    canActivate: [AuthRedirectGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
    canActivate: [AuthRedirectGuard],
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./pages/cadastro/cadastro.page').then(m => m.CadastroPage),
    canActivate: [AuthRedirectGuard],
  },

  // ================================
  // Telas internas (somente logado)
  // ================================
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.page').then(m => m.MenuPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastrar-sensor',
    loadComponent: () =>
      import('./pages/cadastrar-sensor/cadastrar-sensor.page').then(
        m => m.CadastrarSensorPage
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'feedback',
    loadComponent: () =>
      import('./pages/feedback/feedback.page').then(m => m.FeedbackPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'programar-alerta',
    loadComponent: () =>
      import('./pages/programar-alerta/programar-alerta.page').then(
        m => m.ProgramarAlertaPage
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/sobre/sobre.page').then(m => m.SobrePage),
    canActivate: [AuthGuard],
  },

  // ================================
  // Horários → agora funciona COM ou SEM MAC 🔥
  // ================================
  {
    path: 'horarios',
    loadComponent: () =>
      import('./pages/horarios/horarios.page').then(m => m.HorariosPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'horarios/:mac',
    loadComponent: () =>
      import('./pages/horarios/horarios.page').then(m => m.HorariosPage),
    canActivate: [AuthGuard],
  },

  // ================================
  // Telas com parâmetros
  // ================================
  {
    path: 'historico/:mac',
    loadComponent: () =>
      import('./pages/historico/historico.page').then(m => m.HistoricoPage),
    canActivate: [AuthGuard],
  },

  // ================================
  // Tela listagem de sensores
  // ================================
  {
    path: 'sensores',
    loadComponent: () =>
      import('./pages/sensores/sensores.page').then(m => m.SensoresPage),
    canActivate: [AuthGuard],
  },
];
