import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoCartSnackBarComponent } from './goto-cart-snack-bar.component';

describe('GotoCartSnackBarComponent', () => {
  let component: GotoCartSnackBarComponent;
  let fixture: ComponentFixture<GotoCartSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GotoCartSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GotoCartSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
