import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cadastrar-sensor',
    loadComponent: () => import('./pages/cadastrar-sensor/cadastrar-sensor.page').then( m => m.CadastrarSensorPage)
  },
  {
    path: 'feedback',
    loadComponent: () => import('./pages/feedback/feedback.page').then( m => m.FeedbackPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'programar-alerta',
    loadComponent: () => import('./pages/programar-alerta/programar-alerta.page').then( m => m.ProgramarAlertaPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre.page').then( m => m.SobrePage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
];
