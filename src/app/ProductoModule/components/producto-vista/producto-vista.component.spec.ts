import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoVistaComponent } from './producto-vista.component';

describe('ProductoVistaComponent', () => {
  let component: ProductoVistaComponent;
  let fixture: ComponentFixture<ProductoVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
