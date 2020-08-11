import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionDetalleComponent } from './publicacion-detalle.component';

describe('PublicacionDetalleComponent', () => {
  let component: PublicacionDetalleComponent;
  let fixture: ComponentFixture<PublicacionDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
