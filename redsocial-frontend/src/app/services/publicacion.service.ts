import { Publicacion } from './../modelos/Publicacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getPublicaciones() {
    return this.http.get(`${this.API_URI}/publicaciones`);
  }
    // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getPublicacion(id_pub: number) {
    return this.http.get(`${this.API_URI}/publicacion/${id_pub}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  publicar(publicacion: Publicacion, file: File) {
    const form = new FormData();
    form.append('id_usuario', publicacion.id_usuario.toString());
    form.append('fecha_bub', this.convertirFecha(publicacion.fecha_bub));
    form.append('file', file);
    form.append('url', this.API_URI);
    form.append('id_type', publicacion.id_type.toString());
    return this.http.post(`${this.API_URI}/publicar`, form);
  }
  convertirFecha(fecha: Date): string {
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let diaCnv = '';
    let mesCnv = '';
    if (mes < 10) {
      mesCnv = '0' + mes;
      if (dia < 10) {
        diaCnv = '0' + dia;
      }
    }
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
  }
}
