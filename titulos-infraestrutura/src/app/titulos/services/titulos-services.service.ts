import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TitulosServicesService {

  private URL       =  'http://localhost/projetos/titulos/index.php';
  private URL_EXCEL =  "http://localhost/projetos/titulos/src/views/excel.php"

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

  public getDetalheContas(id_titulo) {
    return this.http.get(this.URL, {
      params: {
        acao      :  'getDetalheContas',
        id_titulo : id_titulo
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

  public getTitulos(status = '') {
    return this.http.get(this.URL, {
      params: {
        acao  : 'getTitulos',
        status: status
      }
    })
  }

  public getTitulosAll() {
    return this.http.get(this.URL, {
      params: {
        acao: 'getTitulosAll'
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

  public alterarStatus(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'alterarStatus'
      }
    })
  }

  public editarTitulo(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'editarTitulo'
      }
    })
  }

  public detelarTiutlo(id_titulo) {
    return this.http.post(this.URL, id_titulo, {
      params: {
        acao: 'detelarTitulo'
      }
    })

  }

  public gerarRelatorio(obj, total) {
    return this.http.post(this.URL, obj, {
      params: {
        acao : 'gerarRelatorio',
        total: total
      }
    })
  }

  public gerarExcel(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'gerarExcel'
      }
    })
  }



}
