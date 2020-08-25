import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPendientesPorDiaComponent } from './productos-pendientes-por-dia.component';

describe('ProductosPendientesPorDiaComponent', () => {
  let component: ProductosPendientesPorDiaComponent;
  let fixture: ComponentFixture<ProductosPendientesPorDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosPendientesPorDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosPendientesPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
