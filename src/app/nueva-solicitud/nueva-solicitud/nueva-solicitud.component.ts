import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrosService } from 'src/app/services/registros.service';

@Component({
  selector: 'app-nueva-solicitud',
  templateUrl: './nueva-solicitud.component.html',
  styleUrl: './nueva-solicitud.component.css'
})
export class NuevaSolicitudComponent {

  errorMessage: string = '';

  constructor(private registroService: RegistrosService) { }


  async onSubmit(nueva_solicitud: NgForm) {

    this.errorMessage = '';

    const result = await this.registroService.guardar(nueva_solicitud.value)
    if (result) {
      this.errorMessage = result; // Mostrar el mensaje de error
    }

  }

}
