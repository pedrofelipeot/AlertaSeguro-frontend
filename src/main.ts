import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from '../src/app.config';
import { initializeApp } from 'firebase/app';
import { environment } from './environments/environment';

// Ionicons
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  logOutOutline,
  homeOutline,
  calendarOutline,
  hardwareChipOutline,
  informationCircleOutline,
  chatbubbleEllipsesOutline,
  alertCircleOutline,
  menuOutline,
  powerOutline,
  toggleOutline,
  notificationsOutline,
  warningOutline
} from 'ionicons/icons';
import { defineCustomElements } from 'ionicons/dist/loader';

// Ativa o carregamento dos componentes do Ionicons
defineCustomElements(window);

// ✅ Registra todos os ícones utilizados no app
addIcons({
  arrowBackOutline,
  logOutOutline,
  homeOutline,
  calendarOutline,
  hardwareChipOutline,
  informationCircleOutline,
  chatbubbleEllipsesOutline,
  alertCircleOutline,
  menuOutline,
  powerOutline,
  toggleOutline,
  notificationsOutline,
  warningOutline
});

// ✅ Inicializa o Firebase
initializeApp(environment.firebaseConfig);

// ✅ Inicializa o app principal Angular + Ionic
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
