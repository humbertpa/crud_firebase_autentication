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

  constructor(
    private authService: AuthService,
    private router: Router) { }


  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']); // Redirige a Dashboard si el usuario ya está autenticado
      }
    });
  }

  async register() {
    this.errorMessage = ''; // Limpiar mensaje de error antes de intentar registrar

    const result = await this.authService.register(this.email, this.password, this.name, this.phone);

    if (result) {
      this.errorMessage = result; // Mostrar el mensaje de error
    }
  }
}
