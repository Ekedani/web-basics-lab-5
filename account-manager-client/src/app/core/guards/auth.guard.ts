import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
  }
  return authService.isAuthenticated;
};