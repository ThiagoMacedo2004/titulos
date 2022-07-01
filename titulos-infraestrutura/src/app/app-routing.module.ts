import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroTiuloComponent } from './titulos/menu/cadastro-tiulo/cadastro-tiulo.component';
import { ListaTitulosComponent } from './titulos/menu/lista-titulos/lista-titulos.component';


const routes: Routes = [
  {
    path: 'titulos', component: ListaTitulosComponent
  },

  {
    path: 'cadastro-titulo', component: CadastroTiuloComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
