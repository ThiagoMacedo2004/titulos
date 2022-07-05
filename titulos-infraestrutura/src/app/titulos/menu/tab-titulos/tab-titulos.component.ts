import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-tab-titulos',
  templateUrl: './tab-titulos.component.html',
  styleUrls: ['./tab-titulos.component.css']
})
export class TabTitulosComponent implements OnInit {

  links : any[] = [
    {link:'Cadastrados', status: 'CADASTRADO', icon:'warning'},
    {link:'Lançados'   , status: 'LANÇADO'   , icon:'add'},
    {link:'Aprovados'  , status: 'APROVADO'  , icon:'person'},
    {link:'Entregues'  , status: 'ENTREGUE'  , icon:'warning'},
    {link:'Todos'      , status: 'TODOS'     , icon:'warning'},
  ]
  background: ThemePalette = undefined
  text: ThemePalette = undefined
  activeLink = this.links[0].link
  status: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  changeBackgroud(icon) {


  }

}
