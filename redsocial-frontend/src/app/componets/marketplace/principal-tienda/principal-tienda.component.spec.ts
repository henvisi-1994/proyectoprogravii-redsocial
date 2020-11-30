import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTiendaComponent } from './principal-tienda.component';

describe('PrincipalTiendaComponent', () => {
  let component: PrincipalTiendaComponent;
  let fixture: ComponentFixture<PrincipalTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
