import { FornecedoresComponent } from './titulos/fornecedores/fornecedores.component';
import { TabTitulosComponent } from './titulos/menu/tab-titulos/tab-titulos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaTitulosComponent } from './titulos/menu/tab-titulos/lista-titulos/lista-titulos.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'tabTitulos', pathMatch: 'full'
  },

  {
    path: 'tabTitulos', component: TabTitulosComponent
  },

  {
    path: 'fornecedores', component: FornecedoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
