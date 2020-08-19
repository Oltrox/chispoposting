import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionModeradorComponent } from './navegacion-moderador.component';

describe('NavegacionModeradorComponent', () => {
  let component: NavegacionModeradorComponent;
  let fixture: ComponentFixture<NavegacionModeradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegacionModeradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavegacionModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
