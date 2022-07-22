import { Router} from '@angular/router';
import { TitulosServicesService } from './../../services/titulos-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-fornecedor',
  templateUrl: './cadastrar-fornecedor.component.html',
  styleUrls: ['./cadastrar-fornecedor.component.css']
})
export class CadastrarFornecedorComponent implements OnInit {

  myModel       = ''
  mask          = [ /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/',/\d/, /\d/, /\d/,/\d/,'-',/\d/,/\d/]
  result: any   = []

  formGroup: FormGroup  

  constructor(
    private _fb: FormBuilder,
    private _service: TitulosServicesService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.mascara
    this.formulario()
    this.getInterface()
  }

  formulario() {
    this.formGroup = this._fb.group({
      cod_fornecedor  : ['', Validators.required],
      nome_fornecedor : ['', Validators.required],
      cnpj_fornecedor : ['', Validators.required],
      id_datasul 	    : ['', Validators.required]
    })
  }

  mascara(input: KeyboardEvent ) {
    // console.log(input.key)
    // this.myModel = input.value
    return this.mask
    
  }

  getInterface() {
    this._service.getDatasul().subscribe(
      (data:any) => {
        this.result = data
      }
    )
  }

  cadastrarForncedor() {
    console.log(this.formGroup.value)
    let obj = this.formGroup.value

    this._service.setFornecedor(JSON.stringify(obj)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this._router.navigate(['/fornecedores'])
          this.formGroup.reset()
          
        }
      } 
    )
  }



  
}
