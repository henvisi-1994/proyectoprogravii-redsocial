import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

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
  constructor(private usuarioService: UsuarioService) {
  }
  ngOnInit(): void {
    this.menu();
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
  this.usuario.nom_usuario = usuario.nom_usuario;
  this.usuario.imagen_usuario = usuario.imagen_usuario;
  this.usuario.presentacion = usuario.presentacion_usuario;
  this.usuario.email_user = usuario.email_usuario;
  this.usuario.fecha_nac = this.formato(usuario.fecha_nac_usuario);
  this.usuario.genero = usuario.genero;
}
formato(fecha_nac_usuario: string): string {
 const fecha = fecha_nac_usuario.slice(0, -14);
 const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
 const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
 const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
 return anio + '-' + mes + '-' + dia;
}
  // tslint:disable-next-line: typedef
  menu() {
    $("#messagesmodal").hover(function () {
      $(".modal-comments").toggle();
    });
    $(".modal-comments").hover(function () {
      $(".modal-comments").toggle();
    });

    $("#friendsmodal").hover(function () {
      $(".modal-friends").toggle();
    });
    $(".modal-friends").hover(function () {
      $(".modal-friends").toggle();
    });

    $("#profilemodal").hover(function () {
      $(".modal-profile").toggle();
    });
    $(".modal-profile").hover(function () {
      $(".modal-profile").toggle();
    });


    $("#navicon").click(function () {
      $(".mobilemenu").fadeIn();
    });
    $(".all").click(function () {
      $(".mobilemenu").fadeOut();
    });
  }


}
