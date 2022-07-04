import { TabTitulosComponent } from './titulos/menu/tab-titulos/tab-titulos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroTiuloComponent } from './titulos/menu/cadastro-tiulo/cadastro-tiulo.component';
import { ListaTitulosComponent } from './titulos/menu/tab-titulos/lista-titulos/lista-titulos.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'tabTitulos', pathMatch: 'full'
  },

  {
    path: 'tabTitulos', component: TabTitulosComponent
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
