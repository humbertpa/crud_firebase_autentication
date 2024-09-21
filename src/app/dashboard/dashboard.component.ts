import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { RegistrosService } from '../services/registros/registros.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  registros: any[] = []
  constructor(private registroService: RegistrosService) {

  }

  async ngOnInit(): Promise<void> {
    console.log('Mensaje de inicio en el dashboard')
    const registros = await this.registroService.obtener()
    console.table(registros)
    this.registros = registros
  }
}
