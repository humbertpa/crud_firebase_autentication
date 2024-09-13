import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) { }

  async guardar(nuevo_registro: any) {
    try {
      // Obtener el usuario autenticado
      const user = await firstValueFrom(this.afAuth.authState);

      if (user) {
        const uid = user.uid;
        nuevo_registro["uid"] = uid;
        nuevo_registro["solicitud"] = 'Pendiente';

        // Guardar el registro en Firestore
        await this.firestore.collection('solicitudes').add(nuevo_registro);
        this.router.navigate(['/dashboard']);
        return null;
      } else {
        return 'No hay usuario autenticado';
      }
    } catch (error) {
      console.error('Error al guardar el registro:', error);
      return 'Error al guardar el registro: ' + error;
    }
  }

  async obtener() {
    try {
      // Obtener el usuario autenticado
      const user = await firstValueFrom(this.afAuth.authState);

      if (user) {
        const uid = user.uid;


        const querySnapshot = await this.firestore.collection('solicitudes', ref =>
          ref.where('uid', '==', uid)
        ).get().toPromise();

        // Mapear los documentos a un array de datos
        const registros = querySnapshot?.docs.map(doc => doc.data());

        return registros ? registros : []

      } else {
        console.log('No hay usuario autenticado');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener registros:', error);
      return [];
    }
  }
}
