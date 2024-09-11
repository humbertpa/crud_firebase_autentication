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


  register() {
    this.authService.register(this.email, this.password, this.name, this.phone)
  }
}
