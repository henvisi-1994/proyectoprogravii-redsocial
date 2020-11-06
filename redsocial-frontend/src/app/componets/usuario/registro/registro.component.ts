import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registroForm: FormGroup;

  //Regex para el formato de correo con la siguiente estructura: xxxxxxx@xxxx.xxx
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Regex para el ingreso de contraseñas de 8 a 15 caracteres
  private passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  //regex para nombres y apellidos, incluye letras y espacios
  private namePattern: any = /^[A-Za-zÁÉÍÓÚñáéíóúÑ ]+$/;
  //Regex para el nombre de usuario, incluye cualquier caracter menos espacio
  private userPattern: any = /^[a-z0-9_!.-]{3,16}$/;

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
              private router: Router, ) { }
  ngOnInit(): void {
    this.getGeneros();
    this.registroForm = this.fb.group({
      email: new FormControl('',  [Validators.required, Validators.pattern(this.emailPattern)]),
      nombres: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      fecha_nacimiento: new FormControl(''),
      username: new FormControl('', [Validators.required, Validators.pattern(this.userPattern)]),
      contrasena: new FormControl('', [Validators.required, Validators.pattern(this.passPattern)]),
      genero: new FormControl('')
    });
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
            alert('Usuario registrado con exito');
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
        console.log(res);
        this.generos = res;
      }, err => {}
    );
  }
}
