import { TabTitulosComponent } from './../tab-titulos.component';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-lista-titulos',
  templateUrl: './lista-titulos.component.html',
  styleUrls: ['./lista-titulos.component.css']
})
export class ListaTitulosComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'id',
    'fornecedor',
    'item',
    'cod_fornecedor',
    'num_nf',
    'datasul',
    'dt_emissao',
    'dt_venc',
    'dt_entregue',
    'valor',
    'status'
  ];


  @Input() statusTab : string

  statusChange = new EventEmitter()

  filter       : PeriodicElement[] = ELEMENT_DATA
  parentSelect : boolean           = false
  dataCheck    : PeriodicElement[] = []
  dataSource                       = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  valor        : any               = 0
  valorStr     : string            = 'R$0,00'

  constructor(
    private _liveAnnouncer : LiveAnnouncer,
    private _tabTitulos    : TabTitulosComponent
  ) {}



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.filterStatus()
    this._tabTitulos.emitirPosition.subscribe(
      (result) => {

        this.statusTab = result
        this.filterStatus()
        this.ngAfterViewInit()
      }
    )
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  onChangeTitulo(event: MatCheckboxChange ) {
    const id:any = event.source.value
    const select = event.checked
    var x
    this.dataCheck = this.dataCheck.map((data:PeriodicElement) => {
      if(data.id == id) {
        data.select = select
        this.parentSelect = false
        if(data.select){
          x = data.valor.toFixed(2)
          data.valor = parseFloat(x)
          this.valor += data.valor

        } else {
          x = data.valor.toFixed(2)
          data.valor = parseFloat(x)
          this.valor -= data.valor
          if(this.valor <= 0) {
            this.valor = 0
          }
        }
        this.valorStr = this.valor
        this.valorStr = parseFloat(this.valorStr).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        return data
      }

      if(id == '-1') {
        data.select = this.parentSelect
        if(select){
          x = data.valor.toFixed(2)
          data.valor = parseFloat(x)
          this.valor += data.valor

        } else {
          x = data.valor.toFixed(2)
          data.valor = parseFloat(x)
          this.valor -= data.valor
          if(this.valor <= 0) {
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



  filterStatus() {
    let filterTab:any = this.filter

    let result = this.filter.filter(status => status.status == this.statusTab)
    this.dataSource = new MatTableDataSource(result)
    this.dataCheck  = result
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log('sortttttt')
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

export interface PeriodicElement {
  id             : number;
  select         : boolean
  fornecedor     : string;
  cod_fornecedor : number;
  item           : string;
  num_nf         : number;
  datasul        : string;
  dt_emissao     : string;
  dt_venc        : string;
  dt_entregue    : string;
  valor          : number;
  status         : string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'CADASTRADO' },
  {id:2, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'CADASTRADO' },
  {id:3, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'CADASTRADO' },
  {id:4, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'CADASTRADO' },
  {id:5, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:6, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:7, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'APROVADO' },
  {id:8, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:9, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:10, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'APROVADO' },
  {id:11, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'APROVADO' },
  {id:12, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'APROVADO' },
  {id:13, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'APROVADO' },
  {id:14, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'ENTREGUE' },
  {id:15, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:16, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'ENTREGUE' },
  {id:17, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:18, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:19, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'ENTREGUE' },
  {id:20, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },
  {id:21, select: false,fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', dt_entregue: '01/08/2023', valor: 1000.21, status:'LANÇADO' },

];


