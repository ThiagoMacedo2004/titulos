import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitulosServicesService {

  URL =  'http://localhost/projetos/titulos/index.php'

  constructor(private http: HttpClient) { }

  public getFornecedores() {
    return this.http.get(this.URL)
  }
  
}
