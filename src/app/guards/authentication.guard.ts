import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthentificationService} from "../services/authentification.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthentificationService);
  const router=inject(Router);
  if(!authService.isAuthenticated()){
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
