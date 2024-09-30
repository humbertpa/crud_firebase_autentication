import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegistrosService } from 'src/app/services/registros/registros.service';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.css'
})
export class UserInfoModalComponent {
  @Input() userInfo: any;
  @Output() close = new EventEmitter<void>();  // Emite un evento para cerrar el modal
  selectedSolicitud: string = '';
  comentario: string = '';
  originalSolicitud: string = '';
  originalComentario: string = '';
  hayCambios: boolean = false;
  guardado: boolean = false
  mensaje: string = ''

  constructor(private registrosService: RegistrosService) { }

  ngOnInit() {
    // Inicializar los valores originales para comparación
    this.selectedSolicitud = this.userInfo.docData.solicitud;
    this.comentario = this.userInfo.docData.comentarios;  // Inicializas el comentario si es nuevo
    this.originalSolicitud = this.selectedSolicitud;
    this.originalComentario = this.comentario;
    this.guardado = false;
  }

  cerrarModal() {
    this.close.emit();  // Emite el evento para notificar al componente padre que se debe cerrar el modal
  }

  detectarCambios() {
    this.hayCambios =
      this.selectedSolicitud !== this.originalSolicitud ||
      this.comentario !== this.originalComentario;
  }

  async guardarCambios() {
    const result = await this.registrosService.actualizar(this.comentario, this.selectedSolicitud, this.userInfo.docId)
    console.log(result)

    if (result.success) {
      this.mensaje = 'Actualizaion exitosa'
    } else {
      this.mensaje = 'Error al actualizar informacion'
    }
    this.guardado = true

    setTimeout(() => {
      window.location.reload();  // Refresca la página
    }, 5000);
  }

  cancelarCambios() {
    this.cerrarModal()
  }
}
