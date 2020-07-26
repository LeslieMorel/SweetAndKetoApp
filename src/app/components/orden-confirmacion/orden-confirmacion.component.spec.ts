import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenConfirmacionComponent } from './orden-confirmacion.component';

describe('OrdenConfirmacionComponent', () => {
  let component: OrdenConfirmacionComponent;
  let fixture: ComponentFixture<OrdenConfirmacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenConfirmacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
