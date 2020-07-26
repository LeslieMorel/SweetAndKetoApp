import { TestBed } from '@angular/core/testing';

import { ProductoOrdenService } from './producto-orden.service';

describe('ProductoOrdenService', () => {
  let service: ProductoOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
