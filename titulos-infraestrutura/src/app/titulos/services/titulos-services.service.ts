import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitulosServicesService {

  URL =  'http://localhost/projetos/titulos/index.php';


  constructor(private http: HttpClient) { }

  public getFornecedores() {
    return this.http.get(this.URL,
      {
        params: {
          acao: 'getFornecedores'
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

  public getContasFluxo() {
    return this.http.get(this.URL,{
      params: {
        acao: 'getContasFluxo'
      }
    })
  }

  public getItens(obj) {
    return this.http.post(this.URL, obj, {
      params: {
        acao: 'getItens'
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



}
