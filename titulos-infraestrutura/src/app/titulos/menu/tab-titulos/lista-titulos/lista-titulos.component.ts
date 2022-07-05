import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-lista-titulos',
  templateUrl: './lista-titulos.component.html',
  styleUrls: ['./lista-titulos.component.css']
})
export class ListaTitulosComponent implements OnInit {

  displayedColumns: string[] = [
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

  constructor(private _liveAnnouncer: LiveAnnouncer) {}


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
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'CADASTRADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'LANÇADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Móvel', num_nf: 2210122, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Link MPLS',       num_nf: 2215477, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'APROVADO' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Telefonia Fixa',  num_nf: 2215633, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: '0800 - 0300',     num_nf: 5441223, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },
  {fornecedor: 'TELEFONICA', cod_fornecedor: 10820,  item: 'Fibra Loja 010',  num_nf: 2236588, datasul: 'JORDANESIA', dt_emissao: '03/07/2022', dt_venc: '02/08/2022', valor: 1000.21, status:'ENTREGUE' },

];


