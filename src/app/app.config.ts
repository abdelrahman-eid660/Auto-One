import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { interceptorApi } from './core/interceptors/API.interceptor';
import { importProvidersFrom } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([interceptorApi])),
    importProvidersFrom(CarouselModule), // ده ربط الowlCarousal
    provideToastr(),
    provideAnimations(),
    provideRouter(routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      })
    )
  ],
};
