import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {  }
  canActivate(): boolean {
    if (this.usuarioService.estaLogeado()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }

  }

}
