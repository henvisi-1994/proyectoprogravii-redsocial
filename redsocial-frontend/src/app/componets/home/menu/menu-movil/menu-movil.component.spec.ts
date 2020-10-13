import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMovilComponent } from './menu-movil.component';

describe('MenuMovilComponent', () => {
  let component: MenuMovilComponent;
  let fixture: ComponentFixture<MenuMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMovilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
