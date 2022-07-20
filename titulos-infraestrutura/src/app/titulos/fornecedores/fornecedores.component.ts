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

  displayedColumns: string[] = ['id', 'nome_forn', 'cod_forn', 'cnpj_forn', 'id_inter']; // precisa ser o mesmo nome que chega da api
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

 

  fornecedores() {
    this._services.getFornecedores().subscribe(
      (data) => {
        this.resultData(data)
        
      }
    )
  }

 
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  resultData(data) {
    this.result     = data
    this.dataSource = new MatTableDataSource<Fornecedores>(this.result)
    this.dataSource.sort = this.sort;
  }

}

export interface Fornecedores {
  id        : number,
  nome_forn : number,
  cod_forn  : string,
  cnpj_forn : string,
  id_inter  : number

}
