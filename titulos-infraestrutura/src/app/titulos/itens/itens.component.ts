import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, RequiredValidator, Validators, FormControl } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TitulosServicesService } from '../services/titulos-services.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['id_item', 'nome_item', 'nome_fornecedor', 'nome_interface', 'acao']
  formGroup       : FormGroup
  id_fornecedor   = new FormControl({value: ''}, Validators.required) 
  dataSource      = new MatTableDataSource<Itens>()
  datasul         : any = []
  fornecedores    : any = []
  result          : any = []
  mostrarCard     : boolean = false

  constructor(
    private _services: TitulosServicesService,
    private _fb      : FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  private sort: MatSort;


  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.formulario()
    this.getInterface()
    this.getItens()
    
    this.id_fornecedor.reset({value: '', disabled: true})
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Itens>(this.result)
    console.log(this.dataSource)
    this.dataSource.sort = this.sort;
  }


  formulario() {
    this.formGroup = this._fb.group({
      id_datasul    : ['', Validators.required],
      id_fornecedor : this.id_fornecedor
    })
  }

  getItens() {
    const obj = this.formGroup.value
    this._services.getItens(JSON.stringify(obj)).subscribe(
      (data:Itens) => {
        this.resultData(data)
        this.dataSource.sort = this.sort;
      }
    )

  }

  resultData(data) {
    this.result     = data    
    this.ngAfterViewInit()
    this.mostrarCard = true
  }

  getInterface() {
    this._services.getDatasul().subscribe(
      (data:any) => {
        this.datasul = data
      }
    )
  }

  changeInterface(evento: any){
    // 
    if(evento.value){
      this.getFornecedores(evento.value)
    }

    if(!evento.value){
      this.id_fornecedor.reset({value: '', disabled: true})
    } else {
      this.id_fornecedor.reset({value: '', disabled: false})
    }
  }

  getFornecedores(id_datasul) {
    this._services.getFornecedores(id_datasul).subscribe(
      (data:any) => {
        this.fornecedores = data
      }
    )
  }

  
  limparFiltro() {
    this.formGroup.reset()
    this.result = ''
    // this.mostrarCard = false
    this.getItens()
  }

 

  announceSortChange(sortState: Sort) {
    console.log('teste')
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

export interface Itens {
  id_item         : number,
  nome_item       : string,
  nome_fornecedor : string,
  nome_interface  : string,
}
