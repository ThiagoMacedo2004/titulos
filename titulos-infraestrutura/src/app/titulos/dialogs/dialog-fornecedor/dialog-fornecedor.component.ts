import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-fornecedor',
  templateUrl: './dialog-fornecedor.component.html',
  styleUrls: ['./dialog-fornecedor.component.css']
})
export class DialogFornecedorComponent implements OnInit {

  displayedColumns: string[] = ['cod_fornecedor', 'fornecedor', 'cnpj', 'acao']
  dataSource  = new MatTableDataSource()
  datasul:string = ''
  //contas: any = []

  constructor(
    private dialogRef : MatDialogRef<DialogFornecedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.getFornecedores()
  }


  
  getFornecedores() {
    //this.contas = this.data.obj
    this.dataSource = new MatTableDataSource(this.data.obj)
    this.datasul      = this.data.datasul
    
  }

  fechar() {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






  /*fornecedores : any = []
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
  }*/



  

}
