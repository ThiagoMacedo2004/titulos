import { DialogDetalheTituloComponent } from './../dialogs/dialog-detalhe-titulo/dialog-detalhe-titulo.component';
import { TitulosServicesService } from './../services/titulos-services.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-titulos',
  templateUrl: './lista-titulos.component.html',
  styleUrls: ['./lista-titulos.component.css']
})
export class ListaTitulosComponent implements OnInit {

  displayedColumns: string[] = [
    'sel',
    'nome_fornecedor',
    'nome_item',
    'cod_fornecedor',
    'nf_tit',
    'nome_interface',
    'data_emissao_tit',
    'data_venc_tit',
    'data_entregue',
    'valor_tit',
    'status',
    'acao'
  ];


  statusChange = new EventEmitter()

  // filter: PeriodicElement[] = ELEMENT_DATA
  result: PeriodicElement[] = []
  parentSelect: boolean = false
  dataCheck: PeriodicElement[] = []
  dataCheckD: PeriodicElement[] = []
  dataSource = new MatTableDataSource<PeriodicElement>();
  valor: number
  valorStr: string = 'R$ 0,00'
  valorTotal: any
  disabilitarBtnStatus: boolean = true

  rowDetalhe: any = []

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _services: TitulosServicesService,
    private _dialog  : MatDialog
  ) { }



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getTitulos()
  }

  getTitulos() {
    this._services.getTitulos().subscribe(
      (data:PeriodicElement[]) => {
        console.log(data)
        this.setData(data)
      }
    )
  }

  detalheTitulo(row) {
    console.log(row)
    this.rowDetalhe = row
    this._dialog.open(DialogDetalheTituloComponent, {
      data: {
        row: this.rowDetalhe
      },
      width: '50%'
    })
  }

  setData(data:PeriodicElement[]) {
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataCheck = this.result
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.valorTotal = this.result.reduce((inicial, valor:any) => inicial + parseFloat(valor.valor_tit), 0)
    this.valorTotal = this.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  btnsActions(event:PointerEvent) {
    var v = this.dataCheck.filter(item => item.sel == false)
    console.log(v)
    if(v.length > 0) {
      this.disabilitarBtnStatus = false
    } else {
      this.disabilitarBtnStatus = true
    }
  }

  onChangeTitulo(event: MatCheckboxChange) {
    const id: any = event.source.value
    const select = event.checked

    if (this.dataCheckD.length != 0) {
      this.filterChange(id, select)
    } else {
      this.dataCheck = this.dataCheck.map((data:PeriodicElement) => {
        if (data.id_titulo == id) {
          data.sel = select

          var fullSelected = this.dataCheck.filter((item) => item.sel  == true)
          if(fullSelected.length == this.dataCheck.length && fullSelected.length > 0) {
            console.log(fullSelected)
            this.parentSelect = true
          } else {
            this.parentSelect = false
          }

          var v = this.dataCheck.filter((item) => {
            if(item.sel == true) {
              return item
            }
          })

          var result =  v.reduce((a, value:any) => a + parseFloat(value.valor_tit), 0)
          this.valorStr = result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          return data
        }

        if (id == '-1') {
          data.sel = this.parentSelect
          if (select) {
            var val
            val = this.dataCheck.reduce((a, p:any) => a + parseFloat(p.valor_tit), 0)
            console.log(val)
          } else {
            val = 0
            console.log(val)
          }
          this.valorStr = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          return data
        }
      return data
      })
    }
  }

  filterChange(id, select) {
    var x
    this.dataCheckD = this.dataCheckD.map((data) => {
      if (data.id_titulo == id) {
        data.sel = select
        this.parentSelect = false
        var v = this.dataCheck.filter((item) => {
          if(item.sel == true) {
            return item
          }
        })
        var result =  v.reduce((a, value:any) => a + parseFloat(value.valor_tit), 0)
        this.valorStr = result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        return data
      }

      if (id == '-1') {
        data.sel = this.parentSelect
        if (select) {
          var val
          val = this.dataCheck.reduce((a, p:any) => a + parseFloat(p.valor_tit), 0)
          console.log(val)
        } else {
          val = 0
          console.log(val)
        }
        this.valorStr = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        return data
      }
      return data
    })
  }

  alterarStatus(st) {

    this.disabilitarBtnStatus = true
    var v = this.dataCheck.filter((titulo) => titulo.sel == true)

    console.log(v)
    v.map(
      (row) => {
        row.status = st
        row.sel = false
        this.valorStr = 'R$ 0,00'
        this.parentSelect = false
      }
    )

    this._services.alterarStatus(JSON.stringify(v)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this._services.exibirMsgSucesso(`${v.length} Titulo(s) ${st} !!`)
        } else {
          this._services.exibirMsgErro(data.error)
        }
      }
    )

  }



  filterStatus() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataCheck = this.dataSource.filteredData
    this.dataCheckD = this.dataCheck
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

export interface PeriodicElement {
  sel             : boolean,
  id_titulo       : string,
  nome_fornecedor : string,
  nome_item       : string,
  cod_fornecedor  : string,
  nf_tit          : string,
  nome_interface  : string,
  data_emissao_tit: string,
  data_venc_tit   : string,
  data_entregue   : string,
  valor_tit       : number,
  status          : string
}


