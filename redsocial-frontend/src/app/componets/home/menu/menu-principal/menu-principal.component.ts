import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmistadesService } from 'src/app/services/amistades.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  usuario = {
    id_usuario: 0,
    nom_usuario: '',
    imagen_usuario: '',
    nombres_user: '',
    apellidos_user: '',
    email_user: '',
    celular_user: '',
    fecha_nac: '',
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    genero: ''};
    solicitudes: any;
    cantSolicitudes = 0;
  usuarioBuscar: string;
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private amigosService: AmistadesService) { }

  ngOnInit(): void {
    this.getUsuario();
  }
    // tslint:disable-next-line: typedef
getUsuario() {
  this.usuarioService.getUsuario().subscribe(
    (res: any) => {
      this.almacenarUsuario(res[0]);
      this.getSolicitudesAmistad(res[0].id_usuario);
    }, err => { }
  );
}
// tslint:disable-next-line: typedef
almacenarUsuario(usuario: any) {
  this.usuario.nombres_user = usuario.nombres_usuario;
  this.usuario.apellidos_user = usuario.apellidos_usuario;
  this.usuario.nom_usuario = usuario.nom_usuario;
  this.usuario.imagen_usuario = usuario.imagen_usuario;
  this.usuario.presentacion = usuario.presentacion_usuario;
  this.usuario.email_user = usuario.email_usuario;
  this.usuario.fecha_nac = this.formato(usuario.fecha_nac_usuario);
  this.usuario.genero = usuario.genero;
}
getSolicitudesAmistad(id_usuario: number){
  this.amigosService.getsoliicitudesAmistad(id_usuario).subscribe(
    (res: any) => {
      this.solicitudes = res;
      console.table(res);
      this.cantSolicitudes = res.length;
    }
  );
}
// tslint:disable-next-line: variable-name
aceptar(id_usuario: number, id_amigo: number): void{
  this.amigosService.aceptarAmigo(id_usuario, id_amigo).subscribe(
    (res: any) => {
    }
  );
}
buscar(){
  let ruta = '/home/usuarios/' + this.usuarioBuscar;
  this.router.navigate([ruta]);
}
formato(fecha_nac_usuario: string): string {
 const fecha = fecha_nac_usuario.slice(0, -14);
 const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
 const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
 const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
 return anio + '-' + mes + '-' + dia;
}
 // tslint:disable-next-line: typedef
 public cerrarSesion() {
  this.usuarioService.cerrarSesion().subscribe(
    (res: any) => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {}
  );
  }
}
