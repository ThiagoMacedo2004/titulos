import { DialogDeletarTituloComponent } from './../dialogs/dialog-deletar-titulo/dialog-deletar-titulo.component';
import { DialogDetalheTituloComponent } from './../dialogs/dialog-detalhe-titulo/dialog-detalhe-titulo.component';
import { TitulosServicesService } from './../services/titulos-services.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';


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
  dataSourceAll = new MatTableDataSource<PeriodicElement>();
  valor: number
  valorStr: string = 'R$ 0,00'
  valorTotal: any
  desabilitarBtnStatus: boolean = true
  status:object
  stt: string = 'Cadastrado'
  btns:boolean = false
  btnRelatorio: boolean = true
  rowDetalhe: any = []
  filtro = ''

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _services: TitulosServicesService,
    private _dialog  : MatDialog
  ) { }



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getTitulos('Cadastrado')
    this.status = [
      {status : 'Todos'},
      {status : 'Cadastrado'},
      {status : 'Lançado'},
      {status : 'Aprovado'},
      {status : 'Entregue'}
    ]
    this.getToday()
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
  }

  getTitulos(event = '') {
    this._services.getTitulos(event).subscribe(
      (data:PeriodicElement[]) => {
        this.setData(data)
      }
    )
  }

  getTitulosAll() {
    this._services.getTitulosAll().subscribe(
      (data:any) => {
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
    this.result               = data
    this.dataSource           = new MatTableDataSource(this.result)
    this.dataSource.sort      = this.sort;
    this.dataCheck            = this.result

    this.valorTotal = this.result.reduce((inicial, valor:any) => inicial + parseFloat(valor.valor_tit), 0)
    this.valorTotal = this.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


  }


  onChangeTitulo(event: MatCheckboxChange) {
    const id: any = event.source.value
    const select = event.checked
    
    if (this.dataCheckD.length > 0) {
      this.filterChange(id, select)
    } else {
      this.dataCheck = this.dataCheck.map((data:PeriodicElement) => {
        if (data.id_titulo == id) {
          data.sel = select
          var fullSelected = this.dataCheck.filter((item) => item.sel  == true)

          if(fullSelected.length > 0) {
            this.desabilitarBtnStatus = false
            this.btnRelatorio = false
          } else {
            this.desabilitarBtnStatus = true
            this.btnRelatorio = true
          }

          if(fullSelected.length == this.dataCheck.length && fullSelected.length > 0) {
            
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
            this.btnRelatorio = false
            this.desabilitarBtnStatus = false
          } else {
            val = 0
            this.btnRelatorio = true
            this.desabilitarBtnStatus = true
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
    console.log(id, select)
    this.dataCheckD = this.dataCheckD.map((data) => {
      if (data.id_titulo == id) {
        data.sel = select
        var fullSelected = this.dataCheck.filter((item) => item.sel  == true)

        if(fullSelected.length > 0) {
          this.desabilitarBtnStatus = false
          this.btnRelatorio = false
        } else {
          this.desabilitarBtnStatus = true
          this.btnRelatorio = true
        }

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
          this.desabilitarBtnStatus = false
          this.btnRelatorio = false
        } else {
          val = 0
          console.log(val)
          this.desabilitarBtnStatus = true
          this.btnRelatorio = true
        }
        this.valorStr = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

        return data
      }
      return data
    })
  }

  alterarStatus(st) {

    this.desabilitarBtnStatus = true
    var v = this.dataCheck.filter((titulo) => titulo.sel == true)
   
    console.log(v)
    v.map(
      (row) => {
        if(st == 'Entregue') {
         row.data_entregue = this.getToday()
        }
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
          this.getTitulos(st)
          this.stt = st
        } else {
          this._services.exibirMsgErro(data.error)
        }
      }
    )

  }

  gerarProtocolo() {
    if(this.dataCheckD.length > 0) {
      var v = this.dataCheckD.filter((titulo:any) => titulo.sel == true)
      console.log(v)
      this._services.gerarRelatorio(JSON.stringify(v), this.valorStr).subscribe(
        (data) => {
          console.log(data)
          this._services.exibirMsgSucesso(data)
        },
        (error:HttpErrorResponse) => {
          console.log(error)
          this._services.exibirMsgErro(error.message)
        }
      )
    } else {
      var v = this.dataCheck.filter((titulo:any) => titulo.sel == true)
      console.log(v)
      this._services.gerarRelatorio(JSON.stringify(v), this.valorStr).subscribe(
        (data) => {
          console.log(data)
          this._services.exibirMsgSucesso(data)
        },
        (error:HttpErrorResponse) => {
          console.log(error)
          this._services.exibirMsgErro(error.message)
        }
      )
    }
  }

  getToday() {
    var today = new Date()

    let ano: any = today.getFullYear()
    let mes: any = (today.getMonth()) + 1
    let dia: any = today.getDate()

    if(mes <= 9) {
      mes = `0${mes}`
    }

    if(dia <= 9) {
      dia = `0${dia}`
    }

    return `${ano}-${mes}-${dia}`
  }

  deletarTiutlo(titulo:PeriodicElement) {
    console.log(titulo)
    this._dialog.open(DialogDeletarTituloComponent, {
      data: {
        titulo
      },
      width: '40%'
    }).afterClosed().subscribe(
      () => {
        this.getTitulos(titulo.status)
      }
    )
    
  }

  filterStatus(event:MatSelectChange) {
    this.filtro = ''
    this.parentSelect = false
    this.btnRelatorio = true
    this.valorStr = 'R$ 0,00'
    this.dataCheckD = []
    if(event.value == 'Todos') {
      this.getTitulosAll()
    } else {
      this.getTitulos(event.value)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataCheck = this.dataSource.filteredData

    if(filterValue.length == 0 || filterValue == '' ) {
      this.dataCheckD = []
    }
    this.dataCheckD = this.dataCheck
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log('teste')
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


