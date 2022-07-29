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
  myModel         : string
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
  formularioSend  : any = {}
  listaItensPg    : any[] = []
  listaItensPgView: any[] = []
  valoresitens    : any


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
      this.formularioSend.id_datasul = evento.value
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
          this.dados.value                   = response.nome_fornecedor
          this.dados.cod_fornecedor          = response.cod_fornecedor
          this.dados.id_fornecedor           = response.id_fornecedor
          this.formularioSend.id_fornecedor  = response.id_fornecedor
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
        console.log(result)
        this.dados.nome_item        = result.nome_item
        this.formularioSend.id_item = result.id_item 
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
        this.formularioSend.id_cf   = result.id_cf
      }
    )
  }

  mascaraMoeda() {
    if(this.myModel == '0' || this.myModel == '') {
      return 
    }
   
    var x = this.myModel.replace('.', '')
    var y = parseFloat(x) / 100
    x = y.toFixed(2).toString()
    this.myModel = x
    this.formularioSend.valor_item = this.myModel
  }

 

  dadosObj() {
    this.dados.id_datasul          = ''
    this.dados.id_fornecedor       = ''
    this.dados.cod_fornecedor      = 'Selecione um Fornecedor'
    this.dados.nome_item           = ''
    this.dados.value               = 'Selecione um Fornecedor'
    this.dados.contaFluxo          = ''
    this.formularioSend.valor_item = ''
    this.formularioSend.id_datasul = ''
    this.formularioSend.id_fornecedor = ''
    this.formularioSend.id_cf         = '' 
    this.formularioSend.id_item = ''
  }

  salvarItemPagamento() {
    const objBanco = {
      id_datsul     : this.formularioSend.id_datasul,
      id_fornecedor : this.formularioSend.id_fornecedor,
      id_item       : this.formularioSend.id_item,
      id_contaFluxo : this.formularioSend.id_cf,
      valor_item    : this.formularioSend.valor_item
    }

    const objView = {
      item_contaFluxo    : this.dados.contaFluxo,
      item_valor         : this.formularioSend.valor_item
    }

    this.listaItensPagamento(objBanco, objView)
  }

  listaItensPagamento(objBanco:object, objView:object) {
    this.listaItensPg.push(objBanco)
    this.listaItensPgView.push(objView)
    
    var text = this.listaItensPgView.map(
      (valor) =>{
        var t = parseFloat(valor.item_valor).toFixed(2)
        var n = parseFloat(t)
        return n
      } 
    ).reduce((ant, atu) => ant + atu, 0).toFixed(2)
    var num = parseFloat(text)
    
    this.valoresitens = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})

    this.dados.contaFluxo = ''
    this.formGroup.get('valor').reset()
    this.formGroup.get('id_cf').reset()
    console.log(this.listaItensPg)
  }

  removerValorPg(index) {
    console.log(index)
    var i = this.listaItensPgView.indexOf(index)
    this.listaItensPgView.splice(i, 1)

    var text = this.listaItensPgView.map(
      (valor) =>{
        var t = parseFloat(valor.item_valor).toFixed(2)
        var n = parseFloat(t)
        return n
      } 
    ).reduce((ant, atu) => ant + atu, 0).toFixed(2)
    var num = parseFloat(text)
    
    this.valoresitens = num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})
  }

}
