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
  id_fn           = new FormControl({value: ''}, Validators.required) 
  datasul         : any = []
  fornecedores    : any = []
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
    this.id_fn.reset({value: '', disabled: true})
  }

  formulario() {
    this.formGroup = this._fb.group({
      id_ds   : ['', Validators.required],
      id_fn   : this.id_fn,
      id_item : ['', Validators.required],
      id_cf   : ['', Validators.required],
      valor   : ['', Validators.required]
    })
  }

  changeInterface(evento: any){

    if(evento.value){
      this.getFornecedores(evento.value)
      this.dados.id_ds = evento.value
      
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
      }
    }).afterClosed().subscribe(
      (response) => {
        console.log(response)
        if(response) {
          this.dados.value = response.nome_fornecedor
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

  dadosObj() {
    this.dados.id_datasul = ''
    this.dados.value      = 'Selecione um Fornecedor'
  }

}
