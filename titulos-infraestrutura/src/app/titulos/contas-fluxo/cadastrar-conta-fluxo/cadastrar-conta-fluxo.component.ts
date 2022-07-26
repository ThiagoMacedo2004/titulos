import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TitulosServicesService } from '../../services/titulos-services.service';

@Component({
  selector: 'app-cadastrar-conta-fluxo',
  templateUrl: './cadastrar-conta-fluxo.component.html',
  styleUrls: ['./cadastrar-conta-fluxo.component.css']
})
export class CadastrarContaFluxoComponent implements OnInit {

  myModel       = ''
  mask          = [ /\d/,'.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/]
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
      num_cf     : ['', Validators.required],
      nome_cf    : ['', Validators.required],
      id_datasul : ['', Validators.required]
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

  setContaFluxo() {
    const obj = this.formGroup.value
    this._service.setContaFluxo(JSON.stringify(obj)).subscribe(
      (data:any) => {
        if(data.sucesso) {
          this.formGroup.reset()
          this._router.navigate(['/contas-fluxo'])
        }
      }
    )
  }

}
