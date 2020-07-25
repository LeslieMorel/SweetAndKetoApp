import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosOrdenComponent } from './productos-orden.component';

describe('ProductosOrdenComponent', () => {
  let component: ProductosOrdenComponent;
  let fixture: ComponentFixture<ProductosOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
