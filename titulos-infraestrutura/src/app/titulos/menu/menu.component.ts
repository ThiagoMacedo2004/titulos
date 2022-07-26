import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: object[] = [
    {icon: 'format_list_bulleted', name: 'Títulos'     , link: '/titulos'},
    {icon: 'account_balance'     , name: 'Fornecedores', link: '/fornecedores'},
    {icon: 'wallet'              , name: 'Contas Fluxo', link: '/contas-fluxo'},
    {icon: 'wysiwyg'             , name: 'Itens',        link: '/itens'}
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
