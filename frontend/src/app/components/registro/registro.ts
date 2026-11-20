import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './registro.html',
})
export class Registro {
  usuario = { nombre: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegistro() {
    this.authService.registrar(this.usuario).subscribe({
      next: (res) => {
        console.log('Registro exitoso', res);
        alert('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']); // Lo enviamos al login tras registrarse
      },
      error: (err) => {
        console.error('Error en registro', err);
        // Mostramos el error que devuelve el backend (ej. "El correo ya está registrado")
        const mensajeError = err.error?.mensaje || 'Error al registrar el usuario';
        alert(mensajeError);
      }
    });
  }
}