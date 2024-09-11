import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore, private router: Router) { }

  // Método para iniciar sesión con correo y contraseña
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Login exitoso', result);
      this.router.navigate(['/dashboard']); // Navegar a otra ruta después del login
    } catch (error) {
      console.error('Error en el login', error);
    }
  }

  async register(email: string, password: string, nombre: string, telefono: string) {
    try {
      // Crear el usuario con el email y la contraseña
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Registro exitoso', result);

      const uid = result.user?.uid;
      console.log("El uid del usuario es ", uid)

      if (uid) {
        await this.firestore.collection('usuarios').doc(uid).set({
          nombre: nombre,
          telefono: telefono
        });
        console.log('Datos del usuario guardados en Firestore');
      }

      // Navegar a otra ruta después del registro
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error en el registro', error);
    }
  }


  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  // Obtener el estado del usuario actual
  getUser() {
    return this.afAuth.authState;
  }
}
