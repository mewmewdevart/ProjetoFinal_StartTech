import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapeDadosComponent } from './rodape-dados.component';

describe('RodapeDadosComponent', () => {
  let component: RodapeDadosComponent;
  let fixture: ComponentFixture<RodapeDadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RodapeDadosComponent]
    });
    fixture = TestBed.createComponent(RodapeDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
