import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from '../src/app.config';
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
  cellularOutline,
  trashOutline  // 🔹 Adicionado
} from 'ionicons/icons';

import { defineCustomElements } from 'ionicons/dist/loader';

// HTTP + Interceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './app/interceptors/loading.interceptor';

// Firebase
import { provideFirebaseApp, initializeApp as initFirebase } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

// ✔ Google Auth (Capacitor)
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

// ======================================================
// 🔥 OBRIGATÓRIO → Inicializar GoogleAuth antes de tudo
// ======================================================
GoogleAuth.initialize({
  clientId: '706008625809-gaelv7rqb03avsfpnh55pn61o9k4gfkp.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true
});

// ======================================
// Ativa Ionicons
// ======================================
defineCustomElements(window);

// Registra ícones
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
  cellularOutline,
  trashOutline  // 🔹 Registrado para deletar sensores
});

// ======================================
// Bootstrap Angular + Ionic + Firebase
// ======================================
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),

    // 🔹 Firebase
    provideFirebaseApp(() => initFirebase(environment.firebaseConfig)),
    provideAuth(() => getAuth()),

    // 🔹 HTTP + loading interceptor
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
})
.catch(err => console.error(err));
