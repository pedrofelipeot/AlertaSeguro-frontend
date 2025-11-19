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
  warningOutline,
  timeOutline,
  listOutline,

  // 🔥 ÍCONES ESPECIALMENTE PARA "SENSORES"
  radioOutline,
  radioSharp,
  pulseOutline,
  pulseSharp,
  wifiOutline,
  wifiSharp,
  scanOutline,
  scanSharp,
  barcodeOutline,
  barcodeSharp,
  speedometerOutline,
  speedometerSharp,
  colorFilterOutline,
  analyticsOutline,
  analyticsSharp,
  constructOutline,
  cubeOutline,
  bulbOutline,
  flashOutline,
  cellularOutline
} from 'ionicons/icons';

import { defineCustomElements } from 'ionicons/dist/loader';

// HTTP + Interceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './app/interceptors/loading.interceptor';

// Ativa Ionicons
defineCustomElements(window);

// Registra todos os ícones usados no app
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
  warningOutline,
  timeOutline,
  listOutline,

  // 🔥 todos os ícones úteis para sensores
  radioOutline,
  radioSharp,
  pulseOutline,
  pulseSharp,
  wifiOutline,
  wifiSharp,
  scanOutline,
  scanSharp,
  barcodeOutline,
  barcodeSharp,
  speedometerOutline,
  speedometerSharp,
  colorFilterOutline,
  analyticsOutline,
  analyticsSharp,
  constructOutline,
  cubeOutline,
  bulbOutline,
  flashOutline,
  cellularOutline
});

// Inicializa Firebase
initializeApp(environment.firebaseConfig);

// Bootstrap Angular + Ionic
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideHttpClient(withInterceptors([loadingInterceptor]))
  ]
})
.catch(err => console.error(err));
