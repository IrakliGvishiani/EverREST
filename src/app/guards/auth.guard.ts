import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  

   if(localStorage.getItem("access_token") || localStorage.getItem("refresh_token")){
      return true;
 }
 else{

    return false;
 }
};
