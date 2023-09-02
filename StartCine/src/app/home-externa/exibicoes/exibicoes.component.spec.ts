import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicoesComponent } from './exibicoes.component';

describe('ExibicoesComponent', () => {
  let component: ExibicoesComponent;
  let fixture: ComponentFixture<ExibicoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExibicoesComponent]
    });
    fixture = TestBed.createComponent(ExibicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
