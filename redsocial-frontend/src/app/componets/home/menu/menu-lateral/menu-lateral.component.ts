import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  usuario = {
    id_usuario: 0,
    nombres_user: '',
    apellidos_user: '',
    email_user: '',
    celular_user: '',
    fecha_nac: new Date(),
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    genero: ''};
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getUsuario();
  }
  // tslint:disable-next-line: typedef
getUsuario() {
  this.usuarioService.getUsuario().subscribe(
    (res: any) => {
      this.almacenarUsuario(res[0]);
    }, err => { }
  );
}
// tslint:disable-next-line: typedef
almacenarUsuario(usuario: any) {
  this.usuario.nombres_user = usuario.nombres_usuario;
  this.usuario.apellidos_user = usuario.apellidos_usuario;
  this.usuario.presentacion = usuario.presentacion_usuario;
  this.usuario.email_user = usuario.email;
  this.usuario.genero = usuario.genero;
}
public cerrarSesion() {
  this.usuarioService.cerrarSesion().subscribe(
    (res: any) => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {}
  );
}

}
