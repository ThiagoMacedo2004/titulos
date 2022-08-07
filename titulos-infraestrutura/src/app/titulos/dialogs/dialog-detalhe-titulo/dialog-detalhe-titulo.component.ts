import { TitulosServicesService } from './../../services/titulos-services.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detalhe-titulo',
  templateUrl: './dialog-detalhe-titulo.component.html',
  styleUrls: ['./dialog-detalhe-titulo.component.css']
})
export class DialogDetalheTituloComponent implements OnInit {

  titulo      : any = []
  contasFluxo : any = []

  constructor(
    private dialogRef : MatDialogRef<DialogDetalheTituloComponent>,
    private _services : TitulosServicesService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.titulo = this.data.row
    this.getContasFluxo()
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
