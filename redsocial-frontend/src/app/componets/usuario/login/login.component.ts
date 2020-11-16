import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    token = '';
  constructor(private usuarioService: UsuarioService,
              private notificacionService:NotificacionService,
              private router: Router) { }

  ngOnInit(): void {
    this.verificarSesion();
  }
  // Realiza inicio de sesion
  // tslint:disable-next-line: typedef
  public logear() {
    // Envia datos de NgModel de aporte a servicio de aporte para añadir en bd
    this.usuarioService.loginUsuario(this.usuario).subscribe(
      // Ejecuta  luego de recibir respuesta del servicio de aporte  y almacena en res
      res => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/home']);
      },
      // Errores al enviar datos al servicio de aporte almacenado en  err
      err => {
         this.notificacionService.notificar(err.error,'Error');
         

      }
    );
  }
  // verifica si a iniciado sesion y es asi lo redirige a pagina home
  // tslint:disable-next-line: typedef
  public verificarSesion(){
   if (this.usuarioService.estaLogeado){
      this.router.navigate(['/home']);
    }
  }

}
