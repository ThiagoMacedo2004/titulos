import { TitulosServicesService } from './../services/titulos-services.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';


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
    'status'
  ];


  statusChange = new EventEmitter()

  // filter: PeriodicElement[] = ELEMENT_DATA
  result: PeriodicElement[] = []
  parentSelect: boolean = false
  dataCheck: PeriodicElement[] = []
  dataCheckD: PeriodicElement[] = []
  dataSource = new MatTableDataSource<PeriodicElement>();
  valor: any = 0
  valorStr: string = 'R$ 0,00'

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _services: TitulosServicesService
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

  setData(data:PeriodicElement[]) {
    this.result = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataCheck = this.result
    console.log(this.dataCheck)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  onChangeTitulo(event: MatCheckboxChange) {
    const id: any = event.source.value
    const select = event.checked
    var x

    console.log(id, select)
    console.log(this.dataCheckD.length)
    if (this.dataCheckD.length != 0) {
      this.filterChange(id, select)
    } else {
      this.dataCheck = this.dataCheck.map((data:PeriodicElement) => {
        if (data.id_titulo == id) {
          data.sel = select

          this.parentSelect = false
          if (data.sel) {
            // x = data.valor_tit.toString()
            // data.valor_tit = parseFloat(x)
            // this.valor += data.valor_tit
            var val

            val = this.dataCheck.reduce((a, p) =>{
              if(p.sel){
                return a + p.valor_tit
              }
              
            } , 0)
            console.log(val)
          } else {
            x = data.valor_tit.toFixed(2)
            data.valor_tit = parseFloat(x)
            this.valor -= data.valor_tit
            if (this.valor <= 0) {
              this.valor = 0
            }
          }
          this.valorStr = this.valor
          this.valorStr = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          return data
        }

        if (id == '-1') {
          var val

          val = this.dataCheck.reduce((a, p) => a + p.valor_tit, 0)

          console.log(val)
          data.sel = this.parentSelect
          if (select) {

            x = data.valor_tit.toString()
            data.valor_tit = parseFloat(x)
            this.valor += data.valor_tit

          } else {
            x = data.valor_tit.toFixed(2)
            data.valor_tit = parseFloat(x)
            this.valor -= data.valor_tit
            if (this.valor <= 0) {
              this.valor = 0
            }
            val = 0
            console.log(val)
          }
          this.valorStr = this.valor
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
        if (data.sel) {
          x = data.valor_tit.toFixed(2)
          data.valor_tit = parseFloat(x)
          this.valor += data.valor_tit

        } else {
          x = data.valor_tit.toFixed(2)
          data.valor_tit = parseFloat(x)
          this.valor -= data.valor_tit
          if (this.valor <= 0) {
            this.valor = 0
          }
        }
        this.valorStr = this.valor
        this.valorStr = parseFloat(this.valorStr).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        return data
      }

      if (id == '-1') {
        data.sel = this.parentSelect
        if (select) {

          x = data.valor_tit.toFixed(2)
          data.valor_tit = parseFloat(x)
          this.valor += data.valor_tit

        } else {
          x = data.valor_tit.toFixed(2)
          data.valor_tit = parseFloat(x)
          this.valor -= data.valor_tit
          if (this.valor <= 0) {
            this.valor = 0
          }

        }
        this.valorStr = this.valor
        this.valorStr = parseFloat(this.valorStr).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        return data
      }
      return data
    })
  }

  alterarStatus() {
    this.dataCheck = this.dataCheck.map((item) => {
      if (item.sel || this.parentSelect) {
        item.status = 'LANÇADO'
        item.sel = false
        this.parentSelect = false
        this.valor -= item.valor_tit
        if (this.valor <= 0) {
          this.valor = 0
        }
      }
      this.valorStr = this.valor
      this.valorStr = parseFloat(this.valorStr).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      this.filterStatus()
      this.ngAfterViewInit()
      return item
    })
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

  // const ELEMENT_DATA: PeriodicElement[] = [
  //   { id: 1, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'CADASTRADO' },
  //   { id: 2, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Link MPLS', num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'CADASTRADO' },
  //   { id: 3, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Fixa', num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'CADASTRADO' },
  //   { id: 4, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: '0800 - 0300', num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'CADASTRADO' },
  //   { id: 5, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Fibra Loja 010', num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 6, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 7, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: '0800 - 0300', num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'APROVADO' },
  //   { id: 8, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Fibra Loja 010', num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 9, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 10, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: '0800 - 0300', num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'APROVADO' },
  //   { id: 11, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Fibra Loja 010', num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'APROVADO' },
  //   { id: 12, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'APROVADO' },
  //   { id: 13, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: '0800 - 0300', num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'APROVADO' },
  //   { id: 14, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Fibra Loja 010', num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'ENTREGUE' },
  //   { id: 15, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 16, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: '0800 - 0300', num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'ENTREGUE' },
  //   { id: 17, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Fibra Loja 010', num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 18, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 19, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: '0800 - 0300', num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'ENTREGUE' },
  //   { id: 20, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Fibra Loja 010', num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },
  //   { id: 21, select: false, fornecedor: 'TELEFONICA', cod_fornecedor: 10820, item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status: 'LANÇADO' },

  // ];


