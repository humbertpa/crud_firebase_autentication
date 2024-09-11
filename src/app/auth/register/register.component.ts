import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  errorMessage: string = '';


  async register() {
    this.errorMessage = ''; // Limpiar mensaje de error antes de intentar registrar

    const result = await this.authService.register(this.email, this.password, this.name, this.phone);

    if (result) {
      this.errorMessage = result; // Mostrar el mensaje de error
    }
  }
}
