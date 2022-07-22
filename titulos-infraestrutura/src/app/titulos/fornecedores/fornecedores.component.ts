import { TitulosServicesService } from './../services/titulos-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements AfterViewInit {

  displayedColumns: string[] = ['id_fornecedor', 'nome_fornecedor', 'cod_fornecedor', 'cnpj_fornecedor', 'nome_interface', 'acao']; // precisa ser o mesmo nome que chega da api
  dataSource                 = new MatTableDataSource()
  result: any[]              = []
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _services     : TitulosServicesService
  ) { }

  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit(): void {
    this.fornecedores()
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

  fornecedores() {
    this._services.getFornecedores().subscribe(
      (data) => {
        this.resultData(data)
        console.log(data)
      }
    )
  }

  resultData(data) {
    this.result     = data
    this.dataSource = new MatTableDataSource<Fornecedores>(this.result)
    this.dataSource.sort = this.sort;
  }

 
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  

}

export interface Fornecedores {
  id        : number,
  nome_forn : number,
  cod_forn  : string,
  cnpj_forn : string,
  id_inter  : string

}
