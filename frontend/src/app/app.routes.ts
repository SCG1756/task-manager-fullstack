import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Tareas } from './components/tareas/tareas';
import { authGuard } from './guards/auth-guard'; // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { 
    path: 'tareas', 
    component: Tareas, 
    canActivate: [authGuard] // <-- Aquí protegemos la ruta
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];