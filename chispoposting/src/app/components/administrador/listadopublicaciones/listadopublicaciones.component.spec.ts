import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadopublicacionesComponent } from './listadopublicaciones.component';

describe('ListadopublicacionesComponent', () => {
  let component: ListadopublicacionesComponent;
  let fixture: ComponentFixture<ListadopublicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadopublicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadopublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
