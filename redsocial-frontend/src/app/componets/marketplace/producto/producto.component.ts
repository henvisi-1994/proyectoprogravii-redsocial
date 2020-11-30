import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  existetienda=false;
  existecategoria=false;

  constructor() { }

  ngOnInit(): void {
  }
control_botontn(){
  this.existetienda=true;
}
control_botoncat(){
  this.existecategoria=true;
}



}
