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
  file: File;
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
            this.notificacionService.notificar('Usuario Registrado con exito','Informacion');
            this.limpiar();
            this.abrirModal('cambiarImagenModal');
          },
          err => {
            this.notificacionService.notificar(err.error,'Error');
          }
        );
      }
    }
  }
  cambiarImagen() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.guardarImagen(res[0].id_usuario);
      }, err => { }
    );
  }
  public onFileChange(event): void {
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
 // Abre ventana Modal
  // tslint:disable-next-line: variable-name
  public abrirModal(nombre_modal: string): void {
    const modal = document.getElementById(nombre_modal);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'block';
    body.style.position = 'static';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
  }
  public cerrarModal(nombre_modal: string): void {
    const modal = document.getElementById(nombre_modal);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'none';

    body.style.position = 'inherit';
    body.style.height = 'auto';
    body.style.overflow = 'visible';
  }
  guardarImagen(id_usuario) {
    // tslint:disable-next-line: variable-name
    // tslint:disable-next-line: radix
    this.usuarioService.updateImagenUsuario(id_usuario, this.file).subscribe(
          (res:any) => {
          alert(res);
          this.cerrarModal('cambiarImagenModal');
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
