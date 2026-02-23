import { Routes } from '@angular/router'
import { WelcomePageComponenet } from './welcome-page/welcome-page.component'
import { LogInComponent } from './log-in/log-in.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { HomePageComponent } from './home-page/home-page.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { MinigamePageComponent } from './minigame-page/minigame-page.component'
import { authGuard } from './auth.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomePageComponenet,
    title: 'Welcome to BBB (not ©)',
  },
  {
    path: 'log-in',
    component: LogInComponent,
    title: 'Log In',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: 'Sign In',
  },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home Page',
    canActivate: [authGuard],
    data: {
      requiresAuth: true,
      roles: ['bro', 'member', 'admin'],
    },
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    title: 'Admin Page',
    canActivate: [authGuard],
    data: {
      requiresAuth: true,
      roles: ['admin'],
    },
  },
  {
    path: 'minigame',
    component: MinigamePageComponent,
    title: 'Minigame Page',
    canActivate: [authGuard],
    data: {
      requiresAuth: true,
      roles: ['member', 'admin'],
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 NOT FOUND',
  },
]
