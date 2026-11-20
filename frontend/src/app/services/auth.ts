import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, usuario);
  }

  // Método para iniciar sesión
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credenciales);
  }

  // Guardar el token en el navegador
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Obtener el token
  obtenerToken() {
    return localStorage.getItem('token');
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
  }
}