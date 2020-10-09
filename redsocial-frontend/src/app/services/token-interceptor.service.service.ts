import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UsuarioService } from './usuario.service';


const SECRET_KEY = 'rd**';
@Injectable({
  providedIn: 'root'
})
export class  TokenInterceptorService implements HttpInterceptor {

  constructor( private usuarioService: UsuarioService) { }
  // tslint:disable-next-line: typedef
  intercept(req, next) {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `${SECRET_KEY} ${this.usuarioService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
