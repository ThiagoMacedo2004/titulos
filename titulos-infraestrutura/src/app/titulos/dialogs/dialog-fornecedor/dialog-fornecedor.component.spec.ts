import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFornecedorComponent } from './dialog-fornecedor.component';

describe('DialogFornecedorComponent', () => {
  let component: DialogFornecedorComponent;
  let fixture: ComponentFixture<DialogFornecedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFornecedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
