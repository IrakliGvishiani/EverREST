import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent : () => import('./home/home.component').then(c => c.HomeComponent),
        canActivate: [authGuard]
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
        loadComponent : () => import('./details/details.component').then(com => com.DetailsComponent),
        canActivate: [authGuard]
    },
       {
        path: 'account',
        loadComponent : () => import('./account/account.component').then(com => com.AccountComponent),
        canActivate: [authGuard]
    },
        {
        path: 'recovery',
        loadComponent : () => import('./recovery/recovery.component').then(com => com.RecoveryComponent)
    },
    {
        path: '**',
        component: ErrorComponent
    }

];
