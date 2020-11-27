import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = environment.API_URI; // URL de Backend

  constructor(private http: HttpClient, private router: Router) { }
   // Obtiene Usuarios desde bd mediante servidor backend
   // tslint:disable-next-line: typedef
   getUsuarios() {
    return this.http.get(`${this.API_URI}/usuarios`);
  }
  getUsuariobyId(id_usuario) {
    return this.http.get(`${this.API_URI}/usuario/${id_usuario}`);
  }
  // tslint:disable-next-line: typedef
  getUsuario() {
    return this.http.get(`${this.API_URI}/usuarioauth`);
  }
  getPerfilusuario(usuario: string){
    return this.http.get(`${this.API_URI}/usuario/${usuario}`);
  }

// Elimina Usuarios teniendo id  desde bd mediante servidor backend

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  deleteUsuario(id_usuario: number) {
    return this.http.delete(`${this.API_URI}/deleteUsuario/${id_usuario}`);
  }
// Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
 // tslint:disable-next-line: typedef
 saveUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/createUsuario`, usuario);

  }
// Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  updateUsuario( id_usuario: number, updateUsuario: Usuario) {
    console.log(id_usuario);
    return this.http.put(`${this.API_URI}/updateUsuario/${id_usuario}`, updateUsuario);
  }
  updateImagenUsuario( id_usuario: number, file: File) {
    const form = new FormData();
    form.append('file', file);
    form.append('url', this.API_URI);
    return this.http.put(`${this.API_URI}/updateImagen/${id_usuario}`, form);
  }
  loginUsuario(loginUsuario: Usuario): any {
    return this.http.post(`${this.API_URI}/login`, loginUsuario);
  }
  estaLogeado(): boolean {
    return !!localStorage.getItem('token');
  }
  // tslint:disable-next-line: typedef
  getToken() {
    return localStorage.getItem('token');
  }
  // tslint:disable-next-line: typedef
  cerrarSesion() {
    return this.http.get(`${this.API_URI}/logout`);
  }
  // tslint:disable-next-line: variable-name
  updateContrasena(id_usuario: number, updateUsuario: Usuario): any {
    return this.http.put(`${this.API_URI}/updateContrasena/${id_usuario}`, updateUsuario);
  }
// tslint:disable-next-line: variable-name
confirmContrasena(id_usuario: number, updateUsuario: Usuario): any {
  return this.http.put(`${this.API_URI}/confirmContrasena/${id_usuario}`, updateUsuario);
}
// tslint:disable-next-line: typedef
getGeneros(){
  return this.http.get(`${this.API_URI}/generos`);
}

}
