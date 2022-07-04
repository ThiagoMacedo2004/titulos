import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-tab-titulos',
  templateUrl: './tab-titulos.component.html',
  styleUrls: ['./tab-titulos.component.css']
})
export class TabTitulosComponent implements OnInit {

  links : any[] = [
    {link:'Cadastrados', icon:'warning'},
    {link:'Lançados'   , icon:'add'},
    {link:'Aprovados'  , icon:'person'},
    {link:'Entregues'  , icon:'warning'},
    {link:'Todos'      , icon:'warning'},
  ]
  background: ThemePalette = 'warn'
  text = 'red'
  activeLink = this.links[0].link


  constructor() { }

  ngOnInit(): void {
  }

  changeBackgroud(icon) {
    console.log('teste')
    if(icon == 'warning') {
      this.background = 'warn'
      this.text = 'red'
    } else {
      this.background = 'primary'
      this.text = 'blue'
    }
  }

}
