import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: object[] = [
    {icon: 'format_list_bulleted'    , name: 'Títulos',          link: '/tabTitulos'},
    {icon: 'account_balance'         , name: 'Fornecedores',     link: '/fornecedores'},
    {icon: 'settings'                , name: 'Opções',           link: '/tabTitulos'}
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
