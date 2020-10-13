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
    this.detectarMovil();
  }
  public detectarMovil() {
    if (navigator.userAgent.match(/Android/i)
      || (navigator.userAgent.match(/webOS/i))
      || (navigator.userAgent.match(/iPhone/i))
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
    }
  }

}
