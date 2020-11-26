import { Organizador } from './../../../../modelos/Organizador';
import { OrganizadorService } from './../../../../services/organizador.service';
import { EventoService } from './../../../../services/evento.service';
import { UsuarioService } from './../../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/modelos/Evento';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/modelos/Notificacion';

@Component({
  selector: 'app-principal-evento',
  templateUrl: './principal-evento.component.html',
  styleUrls: ['./principal-evento.component.css'],
})
export class PrincipalEventoComponent implements OnInit {
  evento: Evento = {
    id_evento: 0,
    fecha_hora_evento: new Date(),
    fecha_finalizacion: new Date(),
    nombre_evento: '',
    lugar_evento: '',
    logo: '',
  };
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
    genero: '',
  };
  file: any;
  image = '';
  event_name_notificar = 'notificar';
  constructor(private usuarioService: UsuarioService,
              private eventoService: EventoService,
              private webService: WebSocketService,
              private notificacioneService: NotificacionService,
              private organizadorService: OrganizadorService) {}

  ngOnInit(): void {
        // obtiene publicaciones desde el servidor mediante socket
        this.webService.listen('obtener-notificacion').subscribe((data: any) => {
          this.notificar(data[0].contenido_notif, 'Informacion');
        });
        this.getUsuario();
  }
   // Metodo Notificar
   notificar(mensaje: string, tipo_notificacion: string) {
    this.notificacioneService.notificar(mensaje, tipo_notificacion);
  }
  // Obtiene usuario de sesion actual
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      },
      (err) => {}
    );
  }
  // Almacena datos de usuarios en objeto usuario desde la bd
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.genero = usuario.genero;
  }
  public onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line: typedef
      reader.onload = function load() {
        this.image = reader.result;
      }.bind(this);
      this.file = file;
    }
  }
  guardarEvento(){
    this.eventoService.guardarEvento(this.evento, this.file).subscribe(
      (res: any) => {
        this.asignarOrganizador(res[0].id_evento);
        const notificacion: Notificacion = {
          id_notif: 0,
          contenido_notif: 'El usuario ' + this.usuario.nom_usuario + ' ha realizado un evento',
          fecha_hora_notif: new Date(),
          leida_notif: false,
          id_usuario: this.usuario.id_usuario,
        };
        this.guardarnotificacion(notificacion);
        this.limpiar();
      }
    );
  }
  asignarOrganizador(id_evento: number): void {
    const organizador: Organizador =  {id_organizador: 0 , id_usuario: this.usuario.id_usuario, id_evento};
    this.organizadorService.guardarOrganizador(organizador).subscribe(
      (res: any) => {
        this.notificar('Se ha asignado un organizador', 'Informacion');
      }
    );
  }
  limpiar(): void {
    this.evento.id_evento = 0;
    this.evento.fecha_hora_evento = new Date();
    this.evento.fecha_finalizacion = new Date();
    this.evento.nombre_evento = '';
    this.evento.lugar_evento = '';
    this.evento.logo = '';
  }
  guardarnotificacion(notificacion: Notificacion) {
    this.notificacioneService.guardarNotificacion(notificacion).subscribe(
      (res: any) => {
        notificacion.id_notif = res.id_notif,
        notificacion.contenido_notif = res.contenido_notif,
        notificacion.fecha_hora_notif = res.fecha_hora_notif,
        notificacion.id_usuario = res.id_usuario;
        this.webService.emit(this.event_name_notificar, res);
      }
    );

  }
  public formato(fecha) {
    const fechan = new Date(fecha);
    const dia = fechan.getDate();
    const mes = fechan.getMonth();
    const anio = fechan.getFullYear();
    const hora = fechan.getHours();
    const minutos = fechan.getMinutes();
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return (
      dia +
      ' de ' +
      meses[mes] +
      ' del ' +
      anio +
      ' a partir de las ' +
      hora +
      ' : ' +
      minutos
    );
  }
}
