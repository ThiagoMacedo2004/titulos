import { DialogContaFluxoComponent } from './../../dialogs/dialog-conta-fluxo/dialog-conta-fluxo.component';
import { DialogItemComponent } from './../../dialogs/dialog-item/dialog-item.component';
import { DialogFornecedorComponent } from './../../dialogs/dialog-fornecedor/dialog-fornecedor.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TitulosServicesService } from '../../services/titulos-services.service';

@Component({
  selector: 'app-cadastrar-titulo',
  templateUrl: './cadastrar-titulo.component.html',
  styleUrls: ['./cadastrar-titulo.component.css']
})
export class CadastrarTituloComponent implements OnInit {

  formGroup       : FormGroup
  mask            =  [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, ',' ,/\d/, /\d/]
  myModel         : number
  id_fn           = new FormControl({value: ''}, Validators.required)
  cod_forn        = new FormControl({value: ''}, Validators.required)
  id_item         = new FormControl({value: ''}, Validators.required)
  id_cf           = new FormControl({value: ''}, Validators.required)
  datasul         : any = []
  fornecedores    : any = []
  itens           : any = []
  contas          : any = []
  result          : any = []
  dados           : any = {}


  constructor(
    private _services: TitulosServicesService,
    private _fb      : FormBuilder,
    private _router  : Router,
    private _dialog  : MatDialog
  ) { }
  ngOnInit(): void {
    this.formulario()
    this.getInterface()
    this.dadosObj()
    // this.id_fn.reset({value: '', disabled: true})
    this.cod_forn.reset({value: '', disabled: true})
    this.id_item.reset({value: '', disabled: true})
    this.id_cf.reset({value: '', disabled: true})
  }

  formulario() {
    this.formGroup = this._fb.group({
      id_ds   : ['', Validators.required],
      id_fn   : this.id_fn,
      cod_forn: this.cod_forn,
      id_item : this.id_item,
      id_cf   : this.id_cf,
      valor   : ['', Validators.required]
    })
  }

  changeInterface(evento: any){

    if(evento.value){
      this.getFornecedores(evento.value)
      this.dados.id_ds          = evento.value
      this.dados.cod_fornecedor = ''
      this.dados.nome_item      = ''
      this.dados.contaFluxo     = ''
    }

    // if(!evento.value){
    //   this.id_fn.reset({value: '', disabled: true})
    // } else {
    //   this.id_fn.reset({value: '', disabled: false})
    // }
  }

  getFornecedores(id_ds) {
    this._services.getFornecedores(id_ds).subscribe(
      (data) => {
        this.fornecedores = data
        this.dados.value  = 'Selecione um Fornecedor'
      }
    )
  }

  selecionarFornecedor() {
    let datasul
    if(this.dados.id_datasul == '1') {
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
      (response) => {
        console.log(response)
        if(response) {
          this.dados.value          = response.nome_fornecedor
          this.dados.cod_fornecedor = response.cod_fornecedor
          this.dados.id_fornecedor  = response.id_fornecedor
        } else {
          this.dados.value = 'Selecione um Fornecedor'
        }
      }
    )
  }

  getInterface() {
    this._services.getDatasul().subscribe(
      (data:any) => {
        this.datasul = data

      }
    )
  }

  getItens() {
    const obj = {
      id_datasul    : this.dados.id_datasul,
      id_fornecedor : this.dados.id_fornecedor
    }

    this._services.getItens(JSON.stringify(obj)).subscribe(
      (response) => {
        console.log(response)
        this.selectItem(response)
      }
    )
  }


  selectItem(data) {
    this.itens = data
    this._dialog.open(DialogItemComponent, {
      data: {
        obj: this.itens
      },
      width: '65%'
    }).afterClosed().subscribe(
      (result) => {
        this.dados.nome_item = result.nome_item
      }
    )
  }

  getContasFluxo() {
    this._services.getContasFluxo(this.dados.id_datasul).subscribe(
      (data) => {
        console.log(data)
        this.selectConta(data)
      }
    )
  }

  selectConta(data) {
    this.contas = data
    this._dialog.open(DialogContaFluxoComponent, {
      data: {
        obj: this.contas
      },
      width: '55%'
    }).afterClosed().subscribe(
      (result) => {
        this.dados.contaFluxo = `${result.num_cf} - ${result.nome_cf}`
      }
    )
  }

 


  dadosObj() {
    this.dados.id_datasul     = ''
    this.dados.id_fornecedor  = ''
    this.dados.cod_fornecedor = 'Selecione um Fornecedor'
    this.dados.nome_item      = ''
    this.dados.value          = 'Selecione um Fornecedor'
    this.dados.contaFluxo     = ''
  }

}
