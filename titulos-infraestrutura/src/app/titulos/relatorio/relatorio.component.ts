import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TitulosServicesService } from '../services/titulos-services.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})


export class RelatorioComponent implements OnInit {

  displayedColumns:string[] = []
  result: Result[] = []
  dataSource = new MatTableDataSource();
  sort: any;

  constructor(
    private _services: TitulosServicesService,
  ) { }

  ngOnInit(): void {
    this.relatorio()
  }

  relatorio() {
    this._services.relatorio().subscribe(
      (data:Result[]) => {
        console.log(data)
        this.setData(data)
      }
    )
  }

  setData(data:Result[]) {
    this.result = data
    var meses = []
    data.forEach((data) => {
      meses.push(data.mes_emissao)
    })
    this.displayedColumns = [...new Set(meses)].sort((a:any, b:any) => a - b)

    this.dataSource = new MatTableDataSource(this.result)
    // this.dataSource.sort      = this.sort
  }

}

export interface Result {
  conta_fluxo: string,
  mes_emissao: string,
  valor: number
}
