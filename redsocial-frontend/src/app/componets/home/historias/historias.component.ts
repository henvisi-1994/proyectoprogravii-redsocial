import { Historias } from './../../../modelos/Historias';
import { AmistadesService } from './../../../services/amistades.service';
import { HistoriasService } from './../../../services/historias.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit {
  file: any;
  image = '';
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
    genero: ''
  };
  amigos: any;
  historia: any = {
    imagen_usuario: '',
    nom_usuario: '',
    imagen_historia: ''
  };
  constructor(private usuarioService: UsuarioService,
              private historiaService: HistoriasService,
              private amigosService: AmistadesService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getAmigos();
  }
  abrirHistoria(id_usuario: number) {
    this.historiaService.getHistoriaUsuario(id_usuario).subscribe(
      (res: any) =>{
        this.historia = res[0];
        console.log(res[0]);
      }
    );
    //console.log(this.historia);
    this.abrirModal('mostarHistoriaModal');
  }
  publicar() {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    const historia: Historias = {
      id_historia: 0,
      imagen_historia: '',
      id_usuario
    };
    this.historiaService.publicar_historia(historia, this.file).subscribe(
      (res:any) =>{
          this.cerrarModal('publicarHModal');
      }
    );
  }
  getAmigos() {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    this.amigosService.getAmigos(id_usuario).subscribe(
      (res: any) => {
        this.amigos = res;
      }
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
        this.abrirModal('publicarHModal');
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
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        localStorage.setItem('id_usuario', res[0].id_usuario);
      }, err => { }
    );
  }
  // almacena usuario desde variable usuario obtenido desde bd
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

}
