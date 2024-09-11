import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFiles: FileList | null = null;

  // Maneja la selección de archivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
      for (let i = 0; i < this.selectedFiles.length; i++) {
        console.log(`Archivo seleccionado: ${this.selectedFiles[i].name}`);
      }
    }
  }

  // Maneja el envío del formulario
  onSubmit(): void {
    console.log('Botón oprimido');
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        console.log(`Archivo seleccionado: ${this.selectedFiles[i].name}`);
      }
    } else {
      console.log('No se han seleccionado archivos');
    }
  }
}
