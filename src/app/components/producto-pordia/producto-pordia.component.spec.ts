import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPordiaComponent } from './producto-pordia.component';

describe('ProductoPordiaComponent', () => {
  let component: ProductoPordiaComponent;
  let fixture: ComponentFixture<ProductoPordiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoPordiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPordiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
