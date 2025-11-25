import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './guards/auth.guard';
import { defendGuard } from './guards/defend.guard';

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
        loadComponent: () => import('./sign-in/sign-in.component').then(com => com.SignInComponent),
        canActivate: [defendGuard]
    }
    ,
    {
              path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up.component').then(com => com.SignUpComponent),
        canActivate: [defendGuard]
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
        loadComponent : () => import('./recovery/recovery.component').then(com => com.RecoveryComponent),
        canActivate: [defendGuard]
    },
           {
        path: 'cart',
        loadComponent : () => import('./cart/cart.component').then(com => com.CartComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }

];
