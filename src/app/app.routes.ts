import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent : () => import('./home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./sign-in/sign-in.component').then(com => com.SignInComponent)
    }
    ,
    {
              path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up.component').then(com => com.SignUpComponent)
    },
    {
        path: 'details',
        loadComponent : () => import('./details/details.component').then(com => com.DetailsComponent)
    },
    {
        path: '**',
        component: ErrorComponent
    }

];
