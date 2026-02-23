import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { jwtInterceptor } from './jwt.interceptor'
import { UserManageService } from './user-manage.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAppInitializer(() => {
      const userService = inject(UserManageService)
      return userService.restoreUser()
    }),
  ],
}
