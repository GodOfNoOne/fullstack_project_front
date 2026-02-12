import { Routes } from '@angular/router'
import { WelcomePageComponenet } from './welcome-page/welcome-page.component'
import { LogInComponent } from './log-in/log-in.component'
import { SignInComponent } from './sign-in/sign-in.component'
import { HomePageComponent } from './home-page/home-page.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AdminPageComponent } from './admin-page/admin-page.component'
import { MinigamePageComponent } from './minigame-page/minigame-page.component'

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
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    title: 'Admin Page',
  },
  {
    path: 'minigame',
    component: MinigamePageComponent,
    title: 'Minigame Page',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 NOT FOUND',
  },
]
