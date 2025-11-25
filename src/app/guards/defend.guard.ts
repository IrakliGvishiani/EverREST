import { CanActivateFn } from '@angular/router';

export const defendGuard: CanActivateFn = (route, state) => {
     if(localStorage.getItem("access_token") || localStorage.getItem("refresh_token")){
      return false;
 }
 else{

    return true;
 }
};
