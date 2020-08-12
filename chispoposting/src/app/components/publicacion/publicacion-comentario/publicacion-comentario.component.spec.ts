import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionComentarioComponent } from './publicacion-comentario.component';

describe('PublicacionComentarioComponent', () => {
  let component: PublicacionComentarioComponent;
  let fixture: ComponentFixture<PublicacionComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
