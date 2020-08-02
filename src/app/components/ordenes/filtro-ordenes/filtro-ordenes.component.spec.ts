import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroOrdenesComponent } from './filtro-ordenes.component';

describe('FiltroOrdenesComponent', () => {
  let component: FiltroOrdenesComponent;
  let fixture: ComponentFixture<FiltroOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
