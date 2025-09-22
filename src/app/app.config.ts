// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ServiceWorkerManagerService } from './core/services/service-worker-manager.service';
import { PwaUpdateService } from './core/services/pwa-update.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimations(), 
    provideHttpClient(),
    ServiceWorkerManagerService,
    PwaUpdateService
  ]
};