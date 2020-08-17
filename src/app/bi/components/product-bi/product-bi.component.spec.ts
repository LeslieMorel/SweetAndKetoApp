import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBiComponent } from './product-bi.component';

describe('ProductBiComponent', () => {
  let component: ProductBiComponent;
  let fixture: ComponentFixture<ProductBiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
