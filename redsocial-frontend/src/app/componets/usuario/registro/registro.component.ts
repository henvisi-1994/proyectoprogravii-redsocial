import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: Usuario = {  id_usuario: 0,
    nombres_user: '',
    apellidos_user: '',
    nom_usuario: '',
    email_user: '',
    celular_user: '',
    fecha_nac: new Date(),
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    id_genero: 0 };
    generos = [];
  constructor(private usuarioService: UsuarioService,
              private router: Router, ) { }
  ngOnInit(): void {
    this.getGeneros();
  }
  // Registra usuario
  // tslint:disable-next-line: typedef
  public registrarse(){
    this.usuarioService.saveUsuario(this.usuario).subscribe(
      (res: any) => {
        const token = res.token;
        localStorage.setItem('token', token);
        alert('usuario registrado con exito');
        this.limpiar();
      },
      err => {

      }
    );
  }
  // limpia el objeto usuario
  // tslint:disable-next-line: typedef
  limpiar() {
    this.usuario.nombres_user = '',
    this.usuario.apellidos_user = '',
    this.usuario.email_user = '',
    this.usuario.celular_user = '',
    this.usuario.fecha_nac = new Date(),
    this.usuario.contrasena_usuario =  '',
    this.usuario.presentacion = '',
    this.usuario.telefono =  '',
    this.usuario.id_genero = 0;
  }
  // obtiene los generos desde bd
  // tslint:disable-next-line: typedef
  public getGeneros(){
    this.usuarioService.getGeneros().subscribe(
      (res: any) => {
        console.log(res);
        this.generos = res;
      }, err => {}
    );
  }

}
