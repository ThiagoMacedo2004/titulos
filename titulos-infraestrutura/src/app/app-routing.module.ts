import { ItensComponent } from './titulos/itens/itens.component';
import { CadastrarContaFluxoComponent } from './titulos/contas-fluxo/cadastrar-conta-fluxo/cadastrar-conta-fluxo.component';
import { ContasFluxoComponent } from './titulos/contas-fluxo/contas-fluxo.component';
import { FornecedoresComponent } from './titulos/fornecedores/fornecedores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarFornecedorComponent } from './titulos/fornecedores/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { ListaTitulosComponent } from './titulos/lista-titulos/lista-titulos.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'titulos', pathMatch: 'full'
  },

  {
    path: 'titulos', component: ListaTitulosComponent
  },

  {
    path: 'cadastrar-fornecedor', component: CadastrarFornecedorComponent
  },

  {
    path: 'fornecedores', component: FornecedoresComponent
  },

  {
    path: 'contas-fluxo', component: ContasFluxoComponent
  },

  {
    path: 'cadastrar-contaFluxo', component: CadastrarContaFluxoComponent
  },

  {
    path: 'itens', component: ItensComponent
  },

  {
    path: 'cadastro-item', component: CadastrarFornecedorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
