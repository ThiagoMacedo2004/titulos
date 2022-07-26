import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TitulosServicesService } from '../services/titulos-services.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  displayedColumns: string[] = ['id_item', 'nome_item', 'nome_fornecedor', 'nome_interface']
  formGroup       : FormGroup
  dataSource      = new MatTableDataSource()
  datasul         : any[] = []
  fornecedores    : any[] = []
  result          : any[] = []

  constructor(
    private _services: TitulosServicesService,
    private _fb      : FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.formulario()
    this.getInterface()
    this.getFornecedores()
  }


  formulario() {
    this.formGroup = this._fb.group({
      id_datasul    : ['', Validators.required],
      id_fornecedor : ['', Validators.required]
    })
  }

  getItens() {
    const obj = this.formGroup.value
    this._services.getItens(JSON.stringify(obj)).subscribe(
      (data:object[]) => {
        this.resultData(data)
      }
    )

  }

  resultData(data) {
    this.result     = data
    this.dataSource = new MatTableDataSource(this.result)
    this.dataSource.sort = this.sort;
  }

  getInterface() {
    this._services.getDatasul().subscribe(
      (data:any) => {
        this.datasul = data
      }
    )
  }

  getFornecedores() {
    this._services.getFornecedores().subscribe(
      (data:any) => {
        this.fornecedores = data
        console.log(this.fornecedores)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
