import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';
import { NotificacionService } from 'src/app/services/notificacion.service';

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
    edad;
    alertaEdad;
    alertaGenero;
  constructor(private usuarioService: UsuarioService,
    private notificacionService:NotificacionService,
              private router: Router, ) { }
  ngOnInit(): void {
    this.getGeneros();
  }
  // Registra usuario
  // tslint:disable-next-line: typedef

  public registrarse(){
    
    var genero = this.usuario.id_genero;
    var fecha = this.usuario.fecha_nac;
    
    const convertAge = new Date(fecha);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

    if(this.edad < 18)
    {
      this.alertaEdad = "Usted debe ser mayor de edad para regsitarse."
    }else{
      this.alertaEdad = ""
      if (genero == 0) {
        this.alertaGenero = "Seleccione un género de las opciones otorgadas."
      } else {
        this.usuarioService.saveUsuario(this.usuario).subscribe(
          (res: any) => {
            const token = res.token;
            localStorage.setItem('token', token);
            //alert('Usuario registrado con exito');
            this.notificacionService.notificar('Usuario Registrado con exito','Informacion');
            this.limpiar();
          },
          err => {
    
          }
        );
      }
    }
  }
  // limpia el objeto usuario
  // tslint:disable-next-line: typedef
  limpiar() {
    this.usuario.nombres_user = '',
    this.usuario.apellidos_user = '',
    this.usuario.email_user = '',
    this.usuario.celular_user = '',
    this.usuario.fecha_nac = new Date(),
    this.usuario.nom_usuario = "",
    this.usuario.contrasena_usuario =  '',
    this.usuario.presentacion = '',
    this.usuario.telefono =  '',
    this.usuario.id_genero = 0;
    this.alertaEdad = ""
    this.alertaGenero = ""
  }
  // obtiene los generos desde bd
  // tslint:disable-next-line: typedef
  public getGeneros(){
    this.usuarioService.getGeneros().subscribe(
      (res: any) => {
        this.generos = res;
      }, err => {}
    );
  }

}
