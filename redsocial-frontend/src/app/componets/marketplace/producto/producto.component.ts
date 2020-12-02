import { UsuarioService } from './../../../services/usuario.service';
import { MarketplaceService } from './../../../services/marketplace.service';
import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/services/catalogo.service';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/modelos/Producto';
import { Marketplace } from 'src/app/modelos/Marketplace';
import { DetalleProd } from 'src/app/modelos/DetalleProd';
import { DetalleProdService } from 'src/app/services/detalleprod.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  existetienda = false;
  existecategoria = false;
  file: any;
  image = '';

  producto: Producto = {
    id_producto: 0,
    nombre_producto: '',
    descripcion_producto: '',
    imagen_product:'',
    precio_product: 0,
    id_mark:0,
  };
  detalleprod: DetalleProd = {
    id_catalogo: 0,
    id_producto: 0,
  };

  marketPlace: Marketplace = {
    id_mark: 0,
    contenido_mark: '',
    lugar_mark: '',
    id_usuario:0,
  };
  catalogos: any;
  tiendas: any;
  constructor(private productoService: ProductoService,
    private catalogoService: CatalogoService,
    private marketPlaceService:MarketplaceService,
    private usuarioService:UsuarioService,
    private detalleProdService:DetalleProdService,) {}

  ngOnInit(): void {
    this.getMarketplace();
    this.getCatalogo();
    this.getUsuario();
  }
  control_botontn() {
    this.existetienda = true;
  }
  control_botoncat() {
    this.existecategoria = true;
  }
  public onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line: typedef
      reader.onload = function load() {
        this.image = reader.result;
      }.bind(this);
      this.file = file;
    }
  }

  guardarProducto(){
    this.productoService.guardarProducto(this.producto, this.file).subscribe(
      (res: any) => {
        localStorage.setItem('id_producto',res[0].id_producto);
        this.limpiar();
      }
    );
  }

  guardarTienda(){
    this.marketPlace.id_usuario=parseInt(localStorage.getItem('id_user'));
    this.marketPlaceService.guardarMarketplace(this.marketPlace).subscribe(
      (res: any) => {
        localStorage.setItem('id_mark',res[0].id_mark);
        this.limpiarMarketplace();
      }
    );
  }
  guardarDetalle(){
    this.detalleProdService.guardarDetalleProd(this.detalleprod).subscribe(
      (res: any) => {
        this.limpiarDetalle();
      }
    );
  }
  limpiar(){
    this.producto.id_producto=0;
    this.producto.nombre_producto= '';
    this.producto.descripcion_producto= '';
    this.producto.imagen_product='';
    this.producto.precio_product= 0;
  }

  limpiarDetalle(){
    this.detalleprod.id_producto=0;
    this.detalleprod.id_catalogo= 0;
  }

  limpiarMarketplace(){
    this.marketPlace.id_mark=0;
    this.marketPlace.contenido_mark= '';
    this.marketPlace.lugar_mark= '';
    this.marketPlace.id_usuario=0;
  }

  getCatalogo() {
    this.catalogoService.getcatalogo().subscribe(
      (res: any) => {
        this.catalogos = res;
      }
    );
   }

   getMarketplace() {
    this.marketPlaceService.getMarketplace().subscribe(
      (res: any) => {
        this.tiendas = res;
      }
    );
   }

   getUsuario() {
    this.usuarioService.getUsuario().subscribe(
      (res: any) => {
        localStorage.setItem('id_user',res[0]);
      },
      (err) => {}
    );
  }
  guardar(){
    if(this.existetienda){
      this.guardarTienda();
      this.producto.id_mark=parseInt(localStorage.getItem('id_mark'));
      this.guardarProducto();
      this.detalleprod.id_producto=parseInt(localStorage.getItem('id_producto'));
      this.guardarDetalle();
    }else{
      this.guardarProducto();
      this.detalleprod.id_producto=parseInt(localStorage.getItem('id_producto'));
      this.guardarDetalle();
    }
  }


}
