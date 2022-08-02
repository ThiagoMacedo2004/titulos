import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TitulosServicesService {

  URL =  'http://localhost/projetos/titulos/index.php';

  confgMsgError: MatSnackBarConfig = {
    panelClass         : ['error'],
    horizontalPosition : 'start',
    verticalPosition   : 'bottom',
    duration          : 5000
  }

  confgMsgsuccess: MatSnackBarConfig = {
    panelClass         : ['success'],
    horizontalPosition : 'start',
    verticalPosition   : 'bottom',
    duration           : 5000
  }


  constructor(
    private http: HttpClient,
    private msg : MatSnackBar
  ) { }

  public exibirMsgSucesso(msg: any){
    this.msg.open(msg, 'X', this.confgMsgsuccess)
  }


  public exibirMsgErro(msg: any){
    this.msg.open(msg, 'X', this.confgMsgError)
  }

  public getFornecedores(id_datasul = '') {
    return this.http.get(this.URL,
      {
        params: {
          acao      : 'getFornecedores',
          id_datasul: id_datasul

        }
      }
    )
  }

  public getDatasul() {
    return this.http.get(this.URL,{
        params: {
          acao: 'getDatasul'
        }
      })
  }

  public getContasFluxo(id_datasul = '0') {
    return this.http.get(this.URL,{
      params: {
        acao       : 'getContasFluxo',
        id_ds      : id_datasul
      }
    })
  }

  public getItens(obj = '') {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'getItens'
      }
    })
  }

  public getTitulos() {
    return this.http.get(this.URL, {
      params: {
        acao: 'getTitulos'
      }
    })
  }

  public setFornecedor(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'setFornecedor'
      }
    })
  }

  public setContaFluxo(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'setContaFluxo'
      }
    })
  }

  public setItem(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'setItem'
      }
    })
  }

  public setTitulo(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'setTitulo'
      }
    })
  }

  public setItensTitulo(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'setItensTitulo'
      }
    })
  }



}
