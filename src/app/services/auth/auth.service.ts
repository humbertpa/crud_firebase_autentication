import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  // Método para iniciar sesión con correo y contraseña
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Login exitoso', result);
      this.router.navigate(['/dashboard']);
      return null;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          return 'Correo electrónico o contraseña invalido'; // Mensaje de error específico
        } else {
          return 'Error al iniciar sesion: ' + error.message;
        }
      } else {
        return 'Error desconocido al iniciar sesion';
      }
    }
  }

  async register(nuevo_usuario: any) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(nuevo_usuario.email, nuevo_usuario.password);
      console.log('Registro exitoso', result);

      const uid = result.user?.uid;

      const { password, ...datos_usuario } = nuevo_usuario

      console.log(nuevo_usuario)

      if (uid) {
        await this.firestore.collection('usuarios').doc(uid).set(datos_usuario);
        console.log('Datos del usuario guardados en Firestore');
      }
      this.router.navigate(['/dashboard']);
      return null;
    }
    catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          return 'El correo electrónico ya está en uso. Por favor, usa otro.'; // Mensaje de error específico
        } else {
          return 'Error en el registro: ' + error.message;
        }
      } else {
        return 'Error desconocido en el registro';
      }
    }
  }

  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.afAuth.authState;
  }
}