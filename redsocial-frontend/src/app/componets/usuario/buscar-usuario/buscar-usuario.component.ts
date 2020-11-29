import { AmistadesService } from './../../../services/amistades.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Amigo } from 'src/app/modelos/Amigo';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {
  usuario: string;
  usuarios = [];
  usuarioa = {
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
  amigos: any;
  constructor(private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private amigosService: AmistadesService,
              private router: Router,
              private webService: WebSocketService) { }

  ngOnInit(): void {
    this.usuario = this.route.snapshot.paramMap.get('usuario');
    this.getUsuario();
    this.getAmigos();
  }
  buscarUsuarios(id_usuario: number): void {
    this.usuarioService.getPerfilusuario(this.usuario).subscribe(
      (res: any) => {
        this.filtrar_usuarios(res, id_usuario);
        
      }
    );
  }
  filtrar_usuarios(usuarios: any, id_usuario: number): void {
    this.usuarios = usuarios.filter(usuario => usuario.id_usuario != id_usuario);
    if (this.usuarios.length == 0) {
      this.usuarioService.getUsuario().subscribe(
        (res: any) => {
          const ruta = '/home/perfil/' + res[0].nom_usuario;
          this.router.navigate([ruta]);
        }, err => { }
      );
    }
  }
  getUsuario(): void {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.buscarUsuarios(res[0].id_usuario);
        localStorage.setItem('id_user', res[0].id_usuario)
      }, err => { }
    );
  }
  // almacena usuario desde variable usuario obtenido desde bd
  // tslint:disable-next-line: typedef
  getAmigos() {
    let id_usuario = parseInt(localStorage.getItem('id_user'))
    this.amigosService.getAmigos(id_usuario).subscribe(
      (res: any) => {
        this.amigos = res;
      }
    );
  }
  esAmigo(id_usuario: number): boolean {
    let user = parseInt(localStorage.getItem('id_user'))
    const existe = this.amigos.filter(amigo => amigo.id_amigo == id_usuario);
    if (existe.length > 0 || id_usuario == user) {
      return true;
    } else {
      return false;
    }
  }
  // tslint:disable-next-line: variable-name
  addAmigo(id_usuario: number): void {
    const amigo: Amigo = {
      fecha_emision_amigo: new Date(),
      fecha_aceptacion_amigo: null,
      es_aceptada: false,
      es_seguido: false,
      es_seguidor: false,
      es_bloqueado: false,
      id_usuario: 0,
      id_amigo: 0
    };
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        amigo.id_usuario = (res[0].id_usuario);
        amigo.id_amigo = id_usuario;
        this.guardarAmigo(amigo);
      }, err => { }
    );

  }
  guardarAmigo(amigo: Amigo) {
    this.amigosService.saveAmigo(amigo).subscribe(
      (res: any) => {
        this.webService.emit('enviar-solicitud', res);
        alert('Haz enviado solicitud de amistad');
      }
    );
  }
}
