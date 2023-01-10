import { TitulosServicesService } from './../../services/titulos-services.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-detalhe-titulo',
  templateUrl: './dialog-detalhe-titulo.component.html',
  styleUrls: ['./dialog-detalhe-titulo.component.css']
})
export class DialogDetalheTituloComponent implements OnInit {

  titulo      : any = []
  contasFluxo : any = []
  objForm     : any = {}
  formGroup   : FormGroup

  constructor(
    private dialogRef : MatDialogRef<DialogDetalheTituloComponent>,
    private _services : TitulosServicesService,
    private _fb       : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.titulo = this.data.row
    this.formulario()
    this.getContasFluxo()
    console.log(this.titulo)
  }

  formulario() {
    this.formGroup = this._fb.group({
      nf            : [this.titulo.nf_tit          , Validators.required],
      dt_emissao    : [new Date(this.getData(this.titulo.data_emissao_tit)) ,Validators.required],
      dt_vencimento : [new Date(this.getData(this.titulo.data_venc_tit)) , Validators.required],
      dt_entregue   : [this.titulo.data_entregue ? new Date(this.getData(this.titulo.data_entregue)): null , Validators.required]
    })
  }

  editar(venc) {
    
    let emissao    = this.setData(this.formGroup.value.dt_emissao)
    let vencimento = this.setData(this.formGroup.value.dt_vencimento)
    let entregue   = this.setData(this.formGroup.value.dt_entregue)

    const obj = {
      id            : this.titulo.id_titulo,
      nf            : this.formGroup.value.nf,
      dt_emissao    : emissao,
      dt_vencimento : vencimento,
      dt_entregue   : entregue
    }

    console.log(obj)

    this._services.editarTitulo(JSON.stringify(obj)).subscribe(
      (result:any) => {
        if(result.sucesso) {
          this._services.exibirMsgSucesso('Título alterado com sucesso!')
          this.fechar()
        }
      }
    )
  }

  getData(date) {
    if(date == null) {
      return null
    }

    let data = new Date(date)

    let ano: any = data.getFullYear()
    let mes: any = (data.getUTCMonth()) + 1
    let dia: any = data.getUTCDate()

    if(dia === 1 && mes === 1) {
      ano = ano + 1
    }

    if(mes <= 9) {
      mes = `0${mes}`
    }

    if(dia <= 9) {
      dia = `0${dia}`
    }

    return `${ano},${mes},${dia}`
  }

  setData(date) {
    console.log(date)
    if(!date) {
      return null
    }
    let data = new Date(date)

    let ano: any = data.getFullYear()
    let mes: any = (data.getUTCMonth()) + 1
    let dia: any = data.getUTCDate()



    if(mes <= 9) {
      mes = `0${mes}`
    }

    if(dia <= 9) {
      dia = `0${dia}`
    }

    return `${ano}-${mes}-${dia}`
  }



 
  fechar() {
    this.dialogRef.close();
  }

  getContasFluxo() {
    this._services.getDetalheContas(this.titulo.id_titulo).subscribe(
      (data) => {
        console.log(data)
        this.contasFluxo = data
      }
    )
  }

}
