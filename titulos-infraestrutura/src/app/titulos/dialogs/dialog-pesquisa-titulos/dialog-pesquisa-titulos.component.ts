import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';
import { TitulosServicesService } from '../../services/titulos-services.service';
import { DialogFornecedorComponent } from '../dialog-fornecedor/dialog-fornecedor.component';

@Component({
  selector: 'app-dialog-pesquisa-titulos',
  templateUrl: './dialog-pesquisa-titulos.component.html',
  styleUrls: ['./dialog-pesquisa-titulos.component.css']
})
export class DialogPesquisaTitulosComponent implements OnInit {

  datasul: any = []
  fornecedores: any = []
  result:any[] = []
  fornecedor: string
  displayedColumns: string[] = ['nome_fornecedor', 'cod_fornecedor', 'cnpj_fornecedor'];
  dataSource: any
  dados:any = {}

  constructor(
    private _service: TitulosServicesService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<DialogPesquisaTitulosComponent>
  ) { }

  ngOnInit(): void {
    this.getDatasul()
    this.setDados()
  }

  getDatasul() {
    this._service.getDatasul().subscribe(
      (data) => this.datasul = data
    )
  }

  changeInterface(event:MatSelectChange){
    this.result = []
    this.getFornecedores(event.value)
  }

  getFornecedores(id_ds) {
    this._service.getFornecedores(id_ds).subscribe(
      (data) => {
        this.fornecedores = data
        this.selecionarFornecedor(id_ds)
      }
    )
  }

  selecionarFornecedor(idDatasul) {
    let datasul
    if(idDatasul == '1') {
      datasul = 'JORDANESIA'
    } else {
      datasul = 'LP ADM'
    }
    this._dialog.open(DialogFornecedorComponent, {
      data: {
        obj    : this.fornecedores,
        datasul: datasul
      },
      width:'65%'
    }).afterClosed().subscribe(
      (data) => {
        if(!data) {
          this.setDados()
          return
        }
        this.setData(data)
      }
    )
  }

  setData(data:any) {
    this.dados.fornecedor = data
    this.result.push(data)
    this.dataSource = new MatTableDataSource(this.result)
    this._dialogRef.updateSize('50%')
  }

  limpar() {
    this.result = []
    this.setDados()
    this.dataSource = new MatTableDataSource(this.result)
    this._dialogRef.updateSize('')
  }

  setDados() {
    this.dados.idDatasul = ''
    this.dados.fornecedor = ''
  }

}
