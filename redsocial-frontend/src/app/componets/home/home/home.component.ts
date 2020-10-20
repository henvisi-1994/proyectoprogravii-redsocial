import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }


}
