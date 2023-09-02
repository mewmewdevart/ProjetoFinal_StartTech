import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorAcessosComponent } from './gerenciador-acessos.component';

describe('GerenciadorAcessosComponent', () => {
  let component: GerenciadorAcessosComponent;
  let fixture: ComponentFixture<GerenciadorAcessosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciadorAcessosComponent]
    });
    fixture = TestBed.createComponent(GerenciadorAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
