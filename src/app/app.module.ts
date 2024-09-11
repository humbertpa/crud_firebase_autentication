import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,

  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,

    DashboardComponent,
    AngularFireModule.initializeApp({
      projectId: "proyecto-portafolio-6134b",
      appId: "1:615419194799:web:ffa7b61dbfd0fb7913d35a",
      storageBucket: "proyecto-portafolio-6134b.appspot.com",
      apiKey: "AIzaSyBC2O_P9mvqcoC59vrfhBq_koCS27dS2gw",
      authDomain: "proyecto-portafolio-6134b.firebaseapp.com",
      messagingSenderId: "615419194799",
      measurementId: "G-400BX0QZ4Z"
    }),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
