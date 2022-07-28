import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-conta-fluxo',
  templateUrl: './dialog-conta-fluxo.component.html',
  styleUrls: ['./dialog-conta-fluxo.component.css']
})
export class DialogContaFluxoComponent implements OnInit {

  displayedColumns: string[] = ['num_cf', 'nome_cf', 'nome_interface', 'acao']
  dataSource  = new MatTableDataSource()

  contas: any = []

  constructor(
    private dialogRef : MatDialogRef<DialogContaFluxoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }
  ngOnInit(): void {
    this.getContas()
  }

  getContas() {
    this.contas = this.data.obj
    this.dataSource = new MatTableDataSource(this.contas)
  }

  fechar() {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
