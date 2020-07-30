import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImagenesComponent } from './dialog-imagenes.component';

describe('DialogImagenesComponent', () => {
  let component: DialogImagenesComponent;
  let fixture: ComponentFixture<DialogImagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
