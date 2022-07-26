import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TitulosServicesService } from '../../services/titulos-services.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.css']
})
export class CadastroItemComponent implements OnInit {

  formGroup       : FormGroup
  id_fn  = new FormControl({value: ''}, Validators.required) 
  datasul         : any = []
  fornecedores    : any = []
  result          : any = []
  
  constructor(
    private _services: TitulosServicesService,
    private _fb      : FormBuilder,
    private _router  : Router
  ) { }

  ngOnInit(): void {
    this.formulario()
    this.getInterface()
    
    this.id_fn.reset({value: '', disabled: true})
  }

  formulario() {
    this.formGroup = this._fb.group({
      id_ds     : ['', Validators.required],
      id_fn     : this.id_fn,
      nome_item : ['', Validators.required]
    })
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
      this.id_fn.reset({value: '', disabled: true})
    } else {
      this.id_fn.reset({value: '', disabled: false})
    }
  }

  getFornecedores(id_datasul) {
    this._services.getFornecedores(id_datasul).subscribe(
      (data:any) => {
        this.fornecedores = data
      }
    )
  }

  cadastrarItem() {
    const obj = JSON.stringify(this.formGroup.value) 
    this._services.setItem(obj).subscribe(
      (data:any) => {
        console.log(data)
        if(data.sucesso) {
          this._router.navigate(['/itens'])
        }
      }
    )
  }

  limparFormulario() {
    this.changeInterface(this.formGroup.value.id_fn = '')
    this.formGroup.reset()
    
  }

}
