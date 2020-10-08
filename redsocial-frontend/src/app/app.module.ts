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
const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: PrincipalComponent,
    children: [{ path: '', component: HomeComponent }]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
