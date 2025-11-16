import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http'; // <- IMPORT ESSENCIAL

export const appConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(), // <- ADICIONE ISSO
  ],
};
