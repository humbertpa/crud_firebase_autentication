import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  async uploadFile(files: { [key: string]: File }, docId: string) {
    try {
      //console.log(files)

      for (const [key, file] of Object.entries(files)) {
        const filePath = `${docId}/${key}`;  // Ruta donde se almacenará el archivo
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // Esperar a que la subida del archivo se complete
        await task.snapshotChanges().toPromise();

        // Obtener la URL de descarga después de que el archivo se haya subido
        const downloadURL = await fileRef.getDownloadURL().toPromise();

        console.log("Archivo subido con éxito. URL de descarga:", downloadURL);
      }
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }
}
