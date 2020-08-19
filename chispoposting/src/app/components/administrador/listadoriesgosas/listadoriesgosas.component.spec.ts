import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoriesgosasComponent } from './listadoriesgosas.component';

describe('ListadoriesgosasComponent', () => {
  let component: ListadoriesgosasComponent;
  let fixture: ComponentFixture<ListadoriesgosasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoriesgosasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoriesgosasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
