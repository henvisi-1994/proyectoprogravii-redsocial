import { InvitacionEventoComponent } from './componets/home/eventos/invitacion-evento/invitacion-evento.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Route, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './componets/usuario/login/login.component';
import { RegistroComponent } from './componets/usuario/registro/registro.component';
import { PrincipalComponent } from './componets/home/principal/principal.component';
import { HomeComponent } from './componets/home/home/home.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service.service';
import { MenuPrincipalComponent } from './componets/home/menu/menu-principal/menu-principal.component';
import { MenuLateralComponent } from './componets/home/menu/menu-lateral/menu-lateral.component';
import { MenuMovilComponent } from './componets/home/menu/menu-movil/menu-movil.component';
import { MenuInfoComponent } from './componets/home/menu/menu-info/menu-info.component';
import { PublicacionesComponent } from './componets/home/publicaciones/publicaciones.component';
import { HistoriasComponent } from './componets/home/historias/historias.component';
import { PublicacionComponent } from './componets/home/publicacion/publicacion.component';
import { ListaAmigosComponent } from './componets/home/amigos/lista-amigos/lista-amigos.component';
import { BuscarUsuarioComponent } from './componets/usuario/buscar-usuario/buscar-usuario.component';
import { PrincipalConfigComponent } from './componets/usuario/configuracion/principal-config/principal-config.component';
import { ConfiguracionComponent } from './componets/usuario/configuracion/configuracion/configuracion.component';
import { InformacionPersonalComponent } from './componets/usuario/configuracion/informacion-personal/informacion-personal.component';
import { CambioContrasenaComponent } from './componets/usuario/configuracion/cambio-contrasena/cambio-contrasena.component';
import { MenuConfiguracionComponent } from './componets/usuario/configuracion/menu-configuracion/menu-configuracion.component';
import { MensajeComponent } from './componets/home/mensaje/mensaje.component';
import { ReaccionPubComponent } from './componets/home/reaccion-pub/reaccion-pub.component';
import { ReaccionComComponent } from './componets/home/reaccion-com/reaccion-com.component';
import { ReaccionCdetComponent } from './componets/home/reaccion-cdet/reaccion-cdet.component';
import { PrincipalEventoComponent } from './componets/home/eventos/principal-evento/principal-evento.component';
import { EventoComponent } from './componets/home/eventos/evento/evento.component';
const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'home', component: PrincipalComponent,
    children: [{ path: '', component: HomeComponent },
    { path: 'chat', component: MensajeComponent },
    { path: 'amigos', component: ListaAmigosComponent },
    { path: 'usuarios/:usuario', component: BuscarUsuarioComponent },
    { path: 'publicacion/:id_pub', component: PublicacionComponent },
    { path: 'evento', component: PrincipalEventoComponent},
    { path: 'evento/:id_evento', component: EventoComponent}
  ],
    canActivate: [AuthGuard]
  },
  {
    path: 'configuracion', component: PrincipalConfigComponent,
    children: [{ path: '', component: ConfiguracionComponent },
    { path: 'informacion-personal', component: InformacionPersonalComponent },
    { path: 'cambiar-contrasena', component: CambioContrasenaComponent }
    ],
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    HomeComponent,
    MenuInfoComponent,
    MenuPrincipalComponent,
    MenuLateralComponent,
    MenuMovilComponent,
    PublicacionesComponent,
    InvitacionEventoComponent,
    PrincipalEventoComponent,
    EventoComponent,
    ListaAmigosComponent,
    BuscarUsuarioComponent,
    HistoriasComponent,
    PublicacionComponent,
    PrincipalConfigComponent,
    ConfiguracionComponent,
    InformacionPersonalComponent,
    CambioContrasenaComponent,
    MenuConfiguracionComponent,
    MensajeComponent,
    ReaccionPubComponent,
    ReaccionComComponent,
    ReaccionCdetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
