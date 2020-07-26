import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosPendientesComponent } from './lista-productos-pendientes.component';

describe('ListaProductosPendientesComponent', () => {
  let component: ListaProductosPendientesComponent;
  let fixture: ComponentFixture<ListaProductosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProductosPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProductosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
