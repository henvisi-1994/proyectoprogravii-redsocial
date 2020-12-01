import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-tienda',
  templateUrl: './principal-tienda.component.html',
  styleUrls: ['./principal-tienda.component.css']
})
export class PrincipalTiendaComponent implements OnInit {
  productos = [{
    id: 1,
    titulo: 'Tiltulo 1',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 2,
    titulo: 'Tiltulo 2',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 3,
    titulo: 'Tiltulo 3',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 4,
    titulo: 'Tiltulo 4',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 5,
    titulo: 'Tiltulo 5',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 6,
    titulo: 'Tiltulo 6',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 7,
    titulo: 'Tiltulo 7',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 8,
    titulo: 'Tiltulo 8',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 9,
    titulo: 'Tiltulo 9',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 10,
    titulo: 'Tiltulo 10',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 11,
    titulo: 'Tiltulo 11',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  },
  {
    id: 12,
    titulo: 'Tiltulo 12',
    precio: 10.00,
    descripcion: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis est mattis, dictum lacus tincidunt, accumsan diam. Aenean sem mauris, congue eu quam id, efficitur scelerisque elit. Nam urna est, blandit a arcu sit'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
