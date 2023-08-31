import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemSomosComponent } from './quem-somos.component';

describe('QuemSomosComponent', () => {
  let component: QuemSomosComponent;
  let fixture: ComponentFixture<QuemSomosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuemSomosComponent]
    });
    fixture = TestBed.createComponent(QuemSomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
