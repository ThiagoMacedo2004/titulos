import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormBuilder } from '@angular/forms';

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
    'valor',
    'status'
  ];


  @Input() statusTab : string = ''

  statusChange = new EventEmitter()

  filter: PeriodicElement[] = ELEMENT_DATA

  dataSource = new MatTableDataSource();

  value!: number

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _fb           : FormBuilder
  ) {}

  titulos = this._fb.group({
    selected : [false],
    id       : [this.value]
  })


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.filterStatus()
  }

  ngAfterViewInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }



  filterStatus() {
    let filterTab:any = this.filter

    let result = filterTab.filter(status => status.status == this.statusTab)
    this.dataSource = new MatTableDataSource(result)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  id             : number
  fornecedor     : string;
  cod_fornecedor : number
  item           : string
  num_nf         : number;
  datasul        : string;
  dt_emissao     : string;
  dt_venc        : string;
  valor          : number;
  status         : string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:2, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:3, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:4, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:5, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:6, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:7, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:8, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:9, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:10, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:11, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:12, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:13, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:14, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:15, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:16, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:17, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:18, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:19, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:20, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:21, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:22, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:23, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:24, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:25, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:26, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:27, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:28, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:29, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:30, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:31, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:32, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:33, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:34, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {id:35, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:36, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:37, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:38, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:39, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {id:40, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:41, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:42, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {id:43, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:44, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {id:45, fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },

];


