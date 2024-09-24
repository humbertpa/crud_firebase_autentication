import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) { }

  async guardar(nuevo_registro: any) {
    try {
      // Obtener el usuario autenticado
      const user = await firstValueFrom(this.afAuth.authState);

      if (user) {
        const uid = user.uid;
        nuevo_registro["uid"] = uid;
        nuevo_registro["solicitud"] = 'Pendiente';

        const docRef = await this.firestore.collection('solicitudes').add(nuevo_registro);
        this.router.navigate(['/dashboard']);
        const docId: string = docRef.id
        return { success: true, id: docId };
      } else {
        return { success: false, message: 'No hay usuario autenticado' };
      }
    } catch (error) {
      console.error('Error al guardar el registro:', error);
      return { success: false, message: 'Error al guardar el registro: ' + error };
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

        //console.log(querySnapshot)
        // Mapear los documentos a un array de datos
        let registros: object[] = []

        if (querySnapshot) {
          console.log("Si hubo query snapshot")
          for (const doc of querySnapshot.docs) {
            const docData = doc.data();
            const docId = doc.id;
            const folderRef = this.storage.ref(docId);

            // Convertimos el observable a una promesa
            const filesList = await folderRef.listAll().toPromise();
            // console.log(filesList);

            let urlList = []

            if (filesList) {
              for (const itemRef of filesList.items) {
                const fileUrl = await itemRef.getDownloadURL();
                urlList.push({
                  fileName: itemRef.name,
                  downloadUrl: fileUrl
                });
              }
            }
            registros.push({ urlList, docData })
          }
        }
        console.log(registros)

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
