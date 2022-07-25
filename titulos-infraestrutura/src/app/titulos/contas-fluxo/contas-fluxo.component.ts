import { TitulosServicesService } from './../services/titulos-services.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-contas-fluxo',
  templateUrl: './contas-fluxo.component.html',
  styleUrls: ['./contas-fluxo.component.css']
})
export class ContasFluxoComponent implements OnInit {

  displayedColumns: string[] = ['id_cf', 'num_cf', 'nome_cf', 'nome_interface', 'acao']; // precisa ser o mesmo nome que chega da api
  result: any = []
  dataSource  = new MatTableDataSource()


  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _services     : TitulosServicesService
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getContasF()
  }

  getContasF() {
    this._services.getContasFluxo().subscribe(
      (data) => {
        this.resultData(data)
        console.log(data)
      }
    )
  }

  resultData(data) {
    this.result     = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}
