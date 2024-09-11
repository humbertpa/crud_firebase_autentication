import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  // Método para manejar el login
  async login() {
    this.errorMessage = '';
    const result = await this.authService.login(this.email, this.password);
    if (result) {
      this.errorMessage = result; // Mostrar el mensaje de error
    }
  }
}
