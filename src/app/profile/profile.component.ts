import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async actualizar(usuario_editado: NgForm) {

    this.errorMessage = ''; // Limpiar mensaje de error antes de intentar registrar
    const result = await this.authService.update_profile(usuario_editado.value);
    /*  if (result) {
       this.errorMessage = result; // Mostrar el mensaje de error
     } */
  }


}
