import { Component, EventEmitter, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-tab-titulos',
  templateUrl: './tab-titulos.component.html',
  styleUrls: ['./tab-titulos.component.css']
})
export class TabTitulosComponent implements OnInit {

  status : any[] = ['CADASTRADO', 'LANÇADO', 'APROVADO', 'ENTREGUE']
  position       = 'CADASTRADO'
  emitirPosition = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  changeColor(index:MatTabGroup ) {
    this.position = this.status[index.selectedIndex]
    this.emitirPosition.emit(this.position)
  }

}
