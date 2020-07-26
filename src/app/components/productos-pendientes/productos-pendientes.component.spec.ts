import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPendientesComponent } from './productos-pendientes.component';

describe('ProductosPendientesComponent', () => {
  let component: ProductosPendientesComponent;
  let fixture: ComponentFixture<ProductosPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
