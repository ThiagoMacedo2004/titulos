import { PeriodicElement } from './../../lista-titulos/lista-titulos.component';
import { Router } from '@angular/router';
import { TitulosServicesService } from './../../services/titulos-services.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-deletar-titulo',
  templateUrl: './dialog-deletar-titulo.component.html',
  styleUrls: ['./dialog-deletar-titulo.component.css']
})
export class DialogDeletarTituloComponent implements OnInit {

  row: any[] = []

  constructor(
    private dialogRef : MatDialogRef<DialogDeletarTituloComponent>,
    private _services : TitulosServicesService,
    private _router   : Router,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.row.push(this.data.titulo)
    console.log(this.row)
  }

  delTitulo() {
    console.log(this.data.titulo.id_titulo)
    this._services.detelarTiutlo(JSON.stringify(this.data.titulo)).subscribe(
      (data:any) => {
        this._services.exibirMsgSucesso(data.sucesso)
        this.fechar()
      }
    )

  }

  fechar() {
    this.dialogRef.close();
  }

}
