import { TestBed } from '@angular/core/testing';

import { SalesbiService } from './salesbi.service';

describe('SalesbiService', () => {
  let service: SalesbiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesbiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
