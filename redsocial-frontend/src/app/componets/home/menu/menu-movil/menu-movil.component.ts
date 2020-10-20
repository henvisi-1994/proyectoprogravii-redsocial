import { PublicacionService } from './../../../../services/publicacion.service';
import { Publicacion } from './../../../../modelos/Publicacion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-menu-movil',
  templateUrl: './menu-movil.component.html',
  styleUrls: ['./menu-movil.component.css']
})
export class MenuMovilComponent implements OnInit {
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
  file: any;
  image = '';
  publicacion: Publicacion = {
    id_pub: 0,
    contenido_pub: null,
    url: '',
    fecha_bub: new Date(),
    id_usuario: 0,
    id_type: 0
  };
  // tslint:disable-next-line: variable-name
  event_name = 'publicar';
  esMovil = false;
  tipoArchivo: string;
  constructor(private usuarioService: UsuarioService,
              private publicacionService: PublicacionService,
              private webService: WebSocketService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUsuario();
    this.detectarMovil();

  }
  // Obtiene usuario de sesion
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => { }
    );
  }
  // Almacena en objeto usuario campos recividos desde la bd
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formato(usuario.fecha_nac_usuario);
    this.usuario.genero = usuario.genero;
  }
  // Convierte fecha  recivida a formato entendible por html5
  formato(fecha_nac_usuario: string): string {
   const fecha = fecha_nac_usuario.slice(0, -14);
   const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
   const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
   const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
   return anio + '-' + mes + '-' + dia;
  }
  // Elimina o cierra sesion ademas de eliminar token de sesion
  // tslint:disable-next-line: typedef
  public cerrarSesion() {
    this.usuarioService.cerrarSesion().subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }, err => { }
    );
  }
  // Almacena y muestra archivo en ventana modal al escoger archivo en ventana de administracion de archivos
  // tslint:disable-next-line: typedef
  public onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes('image') || file.type.includes('video')) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // tslint:disable-next-line: typedef
        reader.onload = function load() {

          this.abrirModal();
          this.image = reader.result;
        }.bind(this);
        this.file = file;
        this.verificarTipo(file);
      } else {
        console.log('ha ocurrido un error');
      }
    }
  }
  // devuelve en variable tipoArchivo si el archivo es imagen o video
  // tslint:disable-next-line: typedef
  verificarTipo(file: any) {
    if (file.type.includes('image')){
      this.tipoArchivo = 'imagen';
    } else if (file.type.includes('video')){
      this.tipoArchivo = 'video';
    }
  }
  // Abre ventana Modal
  // tslint:disable-next-line: typedef
  public abrirModal() {
    const modal = document.getElementById('tvesModal');
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'block';
    body.style.position = 'static';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
  }
  // Cierra ventana modal
  // tslint:disable-next-line: typedef
  public cerrarModal() {
    const modal = document.getElementById('tvesModal');
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'none';

    body.style.position = 'inherit';
    body.style.height = 'auto';
    body.style.overflow = 'visible';
  }
  // Realiza publicacion
  // tslint:disable-next-line: typedef
  public publicar() {

    this.publicacion.contenido_pub = this.file;
    this.publicacion.id_usuario = this.usuario.id_usuario;
    if (this.file.type.includes('image')) {
      this.publicacion.id_type = 1;
    } else if (this.file.type.includes('video')) {
      this.publicacion.id_type = 2;
    }
    this.publicacionService.publicar(this.publicacion, this.file).subscribe(
      (res: any) => {
        this.webService.emit(this.event_name, res);
        this.cerrarModal();
      },
      err => { }
    );
  }
  // Detecta si el dispositivo es un celular
  // tslint:disable-next-line: typedef
  public detectarMovil() {
    if (navigator.userAgent.match(/Android/i)
      || (navigator.userAgent.match(/webOS/i))
      || (navigator.userAgent.match(/iPhone/i))
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      this.esMovil = true;
    }
  }
}
