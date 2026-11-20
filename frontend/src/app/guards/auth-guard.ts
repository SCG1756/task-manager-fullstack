import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.obtenerToken()) {
      return true; // Si hay token, deja pasar
    } else {
      this.router.navigate(['/login']); // Si no, lo manda al login
      return false;
    }
  }
}