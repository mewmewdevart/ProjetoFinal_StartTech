import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicoesExternasComponent } from './exibicoes-externas.component';

describe('ExibicoesExternasComponent', () => {
  let component: ExibicoesExternasComponent;
  let fixture: ComponentFixture<ExibicoesExternasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExibicoesExternasComponent]
    });
    fixture = TestBed.createComponent(ExibicoesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
