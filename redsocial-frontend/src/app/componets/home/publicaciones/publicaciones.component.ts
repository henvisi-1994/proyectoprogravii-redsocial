import { ComentarioService } from './../../../services/comentario.service';
import { PublicacionService } from './../../../services/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Comentario } from 'src/app/modelos/Comentario';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/modelos/Notificacion';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  publicaciones: any = [];
  comentarios: any = [];
  // tslint:disable-next-line: variable-name
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
    genero: ''
  };
  comentario: Comentario = {
    id_com: 0,
    contenido_com: '',
    fecha_hora_com: new Date(),
    id_usuario: 0,
    id_pub: 0,
  };
  // tslint:disable-next-line: variable-name
  event_name = 'comentar';
  //
  event_name_notificar_comentario = 'notificar';
  // tslint:disable-next-line: variable-name
  accion_comentario: string;

  constructor(private publicacionService: PublicacionService,
    private webService: WebSocketService,
    private comentarioService: ComentarioService,
    private notificacioneService: NotificacionService,
    private usuarioService: UsuarioService) { }


  ngOnInit(): void {
    this.getPublicaciones();
    this.getUsuario();
    // obtiene publicaciones desde el servidor mediante socket
    this.webService.listen('obtener-notificacion').subscribe((data: any) => {
      this.notificar(data[0].contenido_notif, "Informacion");
    });

    this.webService.listen('obtener-publicacion').subscribe((data: any) => {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < data.length; index++) {
        this.publicaciones.push(data[index][0]);
      }
      const hash = {};
      // elimina publicaciones con id_pub repetido
      this.publicaciones = this.publicaciones.filter(publicacion => hash[publicacion.id_pub] ? false : hash[publicacion.id_pub] = true);
      // Ordena desendentemente las publicaciones
      const publicacionesOrdenadas = this.publicaciones.sort((a, b) => {
        return b.id_pub - a.id_pub;
      });
      // sobrer escribe arreglo publicaciones  con array ordenado
      this.publicaciones = publicacionesOrdenadas;

    });
    // obtiene comentarios desde el servidor mediante socket
    this.webService.listen('obtener-comentario').subscribe((data: any) => {

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.comentarios.push(data[i][0]);
      }
      const hash = {};
      // elimina comentarios con id_com repetido
      this.comentarios = this.comentarios.filter(comentario => hash[comentario.id_com] ? false : hash[comentario.id_com] = true);
      // ordena comentarios desendentemente
      const comentariosOrdenadas = this.comentarios.sort((a, b) => {
        return b.id_com - a.id_com;
      });
      // sobre escribe comentario con comentarios ordenados
      this.comentarios = comentariosOrdenadas;
    });
    // notifica que usuario de sesion actual esta escribiendo comentario
    this.webService.listen('notificar-comentario').subscribe((data: any) => {
      this.accion_comentario = data + ' esta escribiendo...';
    });

  }

  //Metodo Notificar
  notificar(mensaje: string, tipo_notificacion: string) {
    this.notificacioneService.notificar(mensaje, tipo_notificacion);
  }
  // obtiene usuario desde bd
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => { }
    );
  }
  // almacena usuario desde variable usuario obtenido desde bd
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formatoFechUsu(usuario.fecha_nac_usuario);
    this.usuario.genero = usuario.genero;
  }
  // convierte fecha en formato aceptado por html5
  formatoFechUsu(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }
  // Obtiene publicaciones desde bd
  // tslint:disable-next-line: typedef
  getPublicaciones() {
    this.publicacionService.getPublicaciones().subscribe(
      (res: any) => {
        this.publicaciones = res;
        this.getComentarios(res);
      }
    );
  }
  // Obtiene comentarios desde variable comentario
  // tslint:disable-next-line: typedef
  getComentarios(comentario: any) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < comentario.length; index++) {
      this.getComentario(comentario[index].id_pub);
      
    }
  }
  // obtiene comentario de determinada publicacion definida por variable id_pub
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  getComentario(id_pub: number) {

    this.comentarioService.getComentarios(id_pub).subscribe(
      
      (res: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < res.length; index++) {
          this.comentarios.push(res[index]);
        }
      }, err => {

      }
    );
  }
  // notifica quien esta escribiendo comentario
  // tslint:disable-next-line: typedef
  public notificarComentario() {
    this.webService.emit('escribir-comentario', this.usuario.nom_usuario);
  }
  // convierte fecha a formato texto
  // tslint:disable-next-line: typedef
  public formato(texto) {
    const fecha = texto.slice(0, -14);
    // tslint:disable-next-line: max-line-length
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let horas = 0;
    // tslint:disable-next-line: quotemark
    const separador = 'T';
    const tiempop = texto.split(separador);
    const tiempot = tiempop[1].split('.')[0];
    if (Number(tiempot.split(':')[0]) < 5) {
      horas = Number(tiempot.split(':')[0]) + 19;
    } else {
      horas = Number(tiempot.split(':')[0]) - 5;
    }

    const minutos = tiempot.split(':')[1];
    const segundos = tiempot.split(':')[2];
    const tiempo = horas + ':' + minutos + ':' + segundos;
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    // tslint:disable-next-line: radix
    const mesCnv = meses[parseInt(mes)];
    return dia + ' de ' + mesCnv + ' del ' + anio + ' a las ' + tiempo;
  }
  // Comenta publicacion determinada por variable id_pub
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: typedef
  public comentar(id_pub) {
    this.comentario.id_pub = id_pub;
    this.comentario.id_usuario = this.usuario.id_usuario;
    this.comentarioService.comentar(this.comentario).subscribe(
      (res: any) => {
        let notificacion: Notificacion = {
          id_notif: 0,
          contenido_notif: "El usuario " + this.usuario.nom_usuario + " ha comentado una publicacion de: "+res[0].autor_publicacion,
          fecha_hora_notif: new Date(),
          leida_notif:false,
          id_usuario: this.usuario.id_usuario,
        };
        this.guardarnotificacion(notificacion);
        this.webService.emit(this.event_name, res);
        this.comentario.contenido_com = '';
      }
    );
  }
  //GuardaNotificaciones de COmentarios
  guardarnotificacion(notificacion: Notificacion) {
    this.notificacioneService.guardarNotificacion(notificacion).subscribe(
      (res: any) => {
        this.webService.emit(this.event_name_notificar_comentario, res);
      }
    );
  }
  // Realiza conteo de comentarios de publicacion determinada por variable id_pub
  // tslint:disable-next-line: typedef
  public contarComentario(id_pub: number) {
    // tslint:disable-next-line: variable-name
    const cant_com = this.comentarios.filter(comentario => comentario.id_pub == id_pub).length;
    if (cant_com <= 1) {
      return ' ' + cant_com + ' comentario';
    } else {
      return ' ' + cant_com + ' comentarios';
    }
  }

}
