import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css']
})
export class MenuInfoComponent implements OnInit {

  notificaciones: any = [];
  constructor(private notificacionService: NotificacionService,
    private webService: WebSocketService) { }
  ngOnInit(): void {
    this.obtenerNotificaciones();
    // obtiene publicaciones desde el servidor mediante socket
    this.webService.listen('obtener-notificacion').subscribe((data: any) => {
      this.notificaciones.push(data[0]);
      // ordena notificaciones desendentemente
      const notificacionesOrdenadas = this.notificaciones.sort((a, b) => {
        return a.id_notif - b.id_notif;
      });
     
      // sobre escribe comentario con comentarios ordenados
      this.notificaciones = notificacionesOrdenadas;
    });
  }
  obtenerNotificaciones() {
    this.notificacionService.getNotificaciones().subscribe(
      (res: any) => {
        this.notificaciones = res;
      }
    );
  }
  public formato(texto) {
    if (texto) {
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
  }
}

