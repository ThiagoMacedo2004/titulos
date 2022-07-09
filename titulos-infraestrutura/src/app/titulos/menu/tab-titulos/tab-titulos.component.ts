import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTabGroup } from '@angular/material/tabs';

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

  teste = ''

  constructor() { }

  ngOnInit(): void {
  }

  changeColor(index:MatTabGroup ) {
    if(index.selectedIndex == 0) {
      index.color='warn'
    } else {
      index.color = 'primary'
    }
  }

}
