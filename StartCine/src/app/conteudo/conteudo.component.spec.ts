import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoComponent } from './conteudo.component';

describe('ConteudoComponent', () => {
  let component: ConteudoComponent;
  let fixture: ComponentFixture<ConteudoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConteudoComponent]
    });
    fixture = TestBed.createComponent(ConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
