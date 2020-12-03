import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-principal-tienda',
  templateUrl: './principal-tienda.component.html',
  styleUrls: ['./principal-tienda.component.css'],
})
export class PrincipalTiendaComponent implements OnInit {
  productos = [];

  constructor(
    private webService: WebSocketService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.getproductos();

    // obtiene publicaciones desde el servidor mediante socket
    this.webService.listen('obtener-producto').subscribe((data: any) => {
      this.productos = data;
    });
  }
  getproductos() {
    this.productoService.getProductos().subscribe((res: any) => {
      this.productos = res;
    });
  }
}
