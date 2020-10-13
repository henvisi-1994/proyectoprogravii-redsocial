import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
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
const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: PrincipalComponent,
    children: [{ path: '', component: HomeComponent }],
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
    HistoriasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
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
