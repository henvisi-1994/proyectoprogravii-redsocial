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

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder ) {
               }
  
  get email() { return this.registroForm.get('email'); }
  get nombres() { return this.registroForm.get('nombres'); }
  get apellidos() { return this.registroForm.get('apellidos'); }
  get username() { return this.registroForm.get('username'); }
  get contrasena() { return this.registroForm.get('contrasena'); }
  get fecha_nacimiento() { return this.registroForm.get('fecha_nacimiento'); }
  get genero() { return this.registroForm.get('genero'); }
  
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
