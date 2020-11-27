import { AmistadesService } from './../../../services/amistades.service';
import { WebSocketService } from './../../../services/web-socket.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/modelos/Chat';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Mensaje } from 'src/app/modelos/Mensaje';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
})
export class MensajeComponent implements OnInit {
  usuarios: any;
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
    genero: '',
  };
  nomb_chat: any;
  idMessages = 1;
  ContainereContextMenu = document.getElementById('content-menu');

  mensaje: Mensaje = {
    id_mensaje: 0,
    mensaje: '',
    estado: false,
    fecha_hora_mensaje: new Date(),
    id_chat: 0,
    id_usuario: 0,
  };
  mensajes_chat = [];
  mensajes = [];

  constructor(
    private usuarioService: UsuarioService,
    private amigosService: AmistadesService,
    private chatService: ChatService,
    private notificacionService: NotificacionService,
    private webService: WebSocketService
  ) {}

  ngOnInit(): void {
    // notifica que usuario de sesion actual esta escribiendo comentario
    this.webService.listen('writing').subscribe((data: any) => {
      if (data.user !== this.usuario.nom_usuario) {
        let userWriting = [];
        if (data.message === '') {
          userWriting.push('no-show-writing');
        }
      }
    });

    this.webService.listen('new-message').subscribe((data: any) => {
      this.mensajes = data;
    });
    this.getUsuarios();
    this.getUsuario();
  }
  getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      },
      (err) => {}
    );
  }
  // Almacena datos de usuarios en objeto usuario desde la bd
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
  getUsuarios() {
    this.amigosService.getAmigos(this.usuario.id_usuario).subscribe((res: any) => {
      this.usuarios = res;
      console.log(res);
    });
  }
  crearchat(usuario) {
    let chat: Chat = {
      id_chat: 0,
      fecha: new Date(),
      nomb_chat: usuario.nom_usuario,
    };
    this.chatService.chatear(chat).subscribe((res: any) => {
      this.nomb_chat = usuario.nom_usuario;
      this.notificar(res + ' de ' + usuario.nom_usuario, 'Informacion');
    });
  }
  //Metodo Notificar
  notificar(mensaje: string, tipo_notificacion: string) {
    this.notificacionService.notificar(mensaje, tipo_notificacion);
  }
  enviar_imagen(event) {
    this.idMessages = this.idMessages + 1;
    let file = event.target.files[0];
    if (file.type.indexOf('image') !== -1) {
      let reader = new window.FileReader();
      reader.onload = (event) => {
        let payload = {
          id: this.idMessages,
          user: this.usuario.nom_usuario,
          nameFile: file.name,
          message: event.target.result,
          date: new Date(),
        };
        this.webService.emit('new-message', payload);
        this.mensaje.mensaje = '';
      };
      reader.readAsDataURL(file);
    }
  }
  enviar_archivo(event) {
    this.idMessages = this.idMessages + 1;
    let file = event.target.files[0];
    if (file.type.indexOf('image') === -1) {
      let reader = new window.FileReader();
      reader.onload = (event) => {
        let payload = {
          id: this.idMessages,
          user: this.usuario.nom_usuario,
          message: {
            type: file.type,
            nameFile: file.name,
            message: event.target.result,
          },
          date: new Date(),
        };
        this.webService.emit('new-message', payload);
        this.mensaje.mensaje = '';
      };
      reader.readAsArrayBuffer(file);
    }
  }
  enviar() {
    this.idMessages = this.idMessages + 1;
    let payload = {
      id: this.idMessages,
      user: this.usuario.nom_usuario,
      nameFile: '',
      message: this.mensaje.mensaje,
      date: new Date(),
    };
    this.webService.emit('new-message', payload);
    this.mensaje.mensaje = '';
  }
  //Enviar por Enter
  enviar_enter(event) {
    this.idMessages = this.idMessages + 1;
    if (event.key === 'Enter' && this.mensaje.mensaje.trim() !== '') {
      event.preventDefault();
      let payload = {
        id: this.idMessages,
        user: this.usuario.nom_usuario,
        nameFile: '',
        message: this.mensaje.mensaje,
        date: new Date(),
      };
      this.webService.emit('new-message', payload);
      this.mensaje.mensaje = '';
    }
  }
  soltar_tecla(event) {
    if (event.key === 'Enter') {
      this.mensaje.mensaje = '';
    }

    let payload = {
      user: this.usuario.nom_usuario,
      message: this.mensaje.mensaje.trim(),
      nameFile: '',
    };
    this.webService.emit('writing', payload);
  }

  render(messagesData) {
    const messages = document.getElementById('messages-content');
    //this.mensajes_chat.innerHTML = '';
    let html = messagesData.map((data, index) => {
      let date = new Date(data.date);
      let me = data.user === this.usuario.nom_usuario ? 'me' : '';
      let same = '';
      let downLoadAttached = {};
      if (typeof data.message === 'object') {
        downLoadAttached = this.getLinkDownloadAttached(
          data.message.message,
          data.message.type,
          data.message.nameFile
        );
      }
      if (index !== 0) {
        same = data.user === messagesData[index - 1].user ? 'same' : '';
      }
    });

    messages.innerHTML = html;
    messages.scrollTop = messages.scrollHeight;
  }
  getLinkDownloadAttached(arrayBuffer, type, name) {
    let nameArray = name.split('.');
    let ext = nameArray[nameArray.length - 1];
    let blob = new window.Blob([arrayBuffer], { type: type });
    let objectUrl = URL.createObjectURL(blob);
    return {
      href: objectUrl,
      nameFile: name,
      ext: ext !== 'pdf' && ext !== 'docx' ? 'file' : ext,
    };
  }
  createContextMenu(id, x, y) {
    const contentMenu = document.createElement('div');
    const btnDelete = document.createElement('div');
    contentMenu.classList.add('content-context-menu');
    contentMenu.id = 'content-context-menu';
    contentMenu.style.transform = `translate(${x}px, ${y}px)`;
    btnDelete.textContent = 'Eliminar';
    btnDelete.classList.add('btn-eliminar');
    btnDelete.id = 'btn-eliminar';

    btnDelete.addEventListener('click', () => {
      this.webService.emit('delete-message', id);
    });

    contentMenu.appendChild(btnDelete);
    this.ContainereContextMenu.appendChild(contentMenu);
  }
  verificararchivo(mensaje) {
    if (typeof mensaje.message.nameFile != 'undefined') {
      if (mensaje.message.nameFile.toString().indexOf('docx') !== -1) {
        return true;
      } else {
        return false;
      }
    }
  }
  verificararchivopdf(mensaje) {
    if (typeof mensaje.message.nameFile != 'undefined') {
      if (mensaje.message.nameFile.toString().indexOf('pdf') !== -1) {
        return true;
      } else {
        return false;
      }
    }
  }
  verificarimagen(message) {
    if (message.toString().indexOf('image') !== -1) {
      return true;
    } else {
      return false;
    }
  }
  verificartexto(mensaje)
  {
    if(typeof mensaje.nameFile != 'undefined')
    {
      if(mensaje.toString().indexOf('image') == -1&&(mensaje.nameFile.toString().indexOf('docx') == -1)&&(mensaje.nameFile.toString().indexOf('pdf') == -1))
    {
        return true;
    }
    else{
      return false;
    }

    }
  }
}
