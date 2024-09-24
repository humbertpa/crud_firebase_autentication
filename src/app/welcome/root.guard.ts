import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RootGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(isAuthenticated => {
        if (isAuthenticated) {
          // Redirigir al dashboard si el usuario está autenticado
          this.router.navigate(['/dashboard']);
        } else {
          // Redirigir a la página de bienvenida si no está autenticado
          this.router.navigate(['/welcome']);
        }
      }),
      map(() => false) // Para evitar la carga de la ruta actual
    );
  }
}
