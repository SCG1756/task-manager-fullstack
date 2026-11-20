import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  credenciales = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        console.log('Login exitoso', res);
        this.authService.guardarToken(res.token);
        this.router.navigate(['/tareas']); // Redirigir a la lista de tareas
      },
      error: (err) => {
        console.error('Error en login', err);
        alert('Credenciales incorrectas o error en el servidor');
      }
    });
  }
}