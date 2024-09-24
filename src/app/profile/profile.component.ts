import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  errorMessage: string = '';
  editable: boolean = false;

  @ViewChild('usuario_editado') usuario_editado!: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.editable = false;
    this.errorMessage = '';
    const result = await this.authService.get_profile();
    if (result.success == false && typeof (result.message) == 'string') {
      this.errorMessage = result.message;
    } else {
      console.log(result.message)
      if (this.usuario_editado && typeof result.message === 'object' && result.message !== null) {
        this.usuario_editado.setValue(
          result.message
        )
      }

    }
  }


  toggle() {
    this.editable = !this.editable;

  }

  async actualizar(usuario_editado: NgForm) {

    this.errorMessage = ''; // Limpiar mensaje de error antes de intentar registrar
    const result = await this.authService.update_profile();
    /*  if (result) {
       this.errorMessage = result; // Mostrar el mensaje de error
     } */
  }
}
