import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { TextMaskModule } from 'angular2-text-mask';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitulosComponent } from './titulos/titulos.component';
import { HeaderComponent } from './titulos/header/header.component';
import { MenuComponent } from './titulos/menu/menu.component';
import { ListaTitulosComponent } from './titulos/lista-titulos/lista-titulos.component';
import { FornecedoresComponent } from './titulos/fornecedores/fornecedores.component';
import { CadastrarFornecedorComponent } from './titulos/fornecedores/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { ContasFluxoComponent } from './titulos/contas-fluxo/contas-fluxo.component';
import { CadastrarContaFluxoComponent } from './titulos/contas-fluxo/cadastrar-conta-fluxo/cadastrar-conta-fluxo.component';
import { ItensComponent } from './titulos/itens/itens.component';
import { CadastroItemComponent } from './titulos/itens/cadastro-item/cadastro-item.component';
import { CadastrarTituloComponent } from './titulos/lista-titulos/cadastrar-titulo/cadastrar-titulo.component';
import { DialogFornecedorComponent } from './titulos/dialogs/dialog-fornecedor/dialog-fornecedor.component';
import { DialogItemComponent } from './titulos/dialogs/dialog-item/dialog-item.component';


@NgModule({
  declarations: [
    AppComponent,
    TitulosComponent,
    HeaderComponent,
    MenuComponent,
    ListaTitulosComponent,
    FornecedoresComponent,
    CadastrarFornecedorComponent,
    ContasFluxoComponent,
    CadastrarContaFluxoComponent,
    ItensComponent,
    CadastroItemComponent,
    CadastrarTituloComponent,
    DialogFornecedorComponent,
    DialogItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    TextMaskModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})


export class AppModule { }
