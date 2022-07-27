import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-fornecedor',
  templateUrl: './dialog-fornecedor.component.html',
  styleUrls: ['./dialog-fornecedor.component.css']
})
export class DialogFornecedorComponent implements OnInit {

  fornecedores : any = []
  datasul      : string

  constructor(
    private dialogRef : MatDialogRef<DialogFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.fornecedores = this.data.obj
    this.datasul      = this.data.datasul
    
  }

  getFornSelect(event) {
    console.log(event)
  }

  fechar() {
    this.dialogRef.close();
  }

}
