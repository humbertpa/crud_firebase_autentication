import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrosService } from 'src/app/services/registros/registros.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrl: './nueva-solicitud.component.css'
})
export class NuevaSolicitudComponent {

  errorMessage: string = '';
  selectedFiles: { [key: string]: File } = {};

  constructor(private registroService: RegistrosService, private uploadService: UploadService) { }

  onFileSelected(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[fieldName] = file;
    }
  }

  async onSubmit(nueva_solicitud: NgForm) {
    this.errorMessage = '';

    if (this.selectedFiles) {
      const solicitud = nueva_solicitud.value
      const result = await this.registroService.guardar(solicitud)
      if (result.id) {
        this.uploadService.uploadFile(this.selectedFiles, result.id)
      } else {
        this.errorMessage = 'Error al subir registro'
      }
    } else {
      this.errorMessage = "No hay elemento seleccionado"
    }
  }
}
