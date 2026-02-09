import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomePage,
        title: 'Welcome to BBB (not ©)'
    }
];
