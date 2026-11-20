import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit {
  tareas: any[] = [];
  nuevaTarea = { titulo: '', descripcion: '' };
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    const token = this.authService.obtenerToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    this.http.get<any[]>(`${this.apiUrl}/tareas`, { headers }).subscribe({
      next: (data) => this.tareas = data,
      error: (err) => console.error('Error al obtener tareas', err)
    });
  }

  crearTarea() {
    if (!this.nuevaTarea.titulo) return;

    const token = this.authService.obtenerToken();
    const headers = { Authorization: `Bearer ${token}` };

    this.http.post(`${this.apiUrl}/tareas`, this.nuevaTarea, { headers }).subscribe({
      next: () => {
        this.nuevaTarea = { titulo: '', descripcion: '' }; // Limpiar formulario
        this.obtenerTareas(); // Recargar la lista
      },
      error: (err) => console.error('Error al crear tarea', err)
    });
  }

  // AQUÍ ESTÁ LA NUEVA FUNCIÓN
  cambiarEstado(tarea: any) {
    const token = this.authService.obtenerToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    // Creamos el objeto con los datos actualizados
    const tareaActualizada = { 
      ...tarea, 
      estado: 'completada' 
    };

    this.http.put(`${this.apiUrl}/tareas/${tarea.id}`, tareaActualizada, { headers }).subscribe({
      next: () => this.obtenerTareas(), // Recargamos la lista
      error: (err) => console.error('Error al actualizar tarea', err)
    });
  }

  eliminarTarea(id: number) {
    const token = this.authService.obtenerToken();
    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete(`${this.apiUrl}/tareas/${id}`, { headers }).subscribe({
      next: () => this.obtenerTareas(),
      error: (err) => console.error('Error al eliminar tarea', err)
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}