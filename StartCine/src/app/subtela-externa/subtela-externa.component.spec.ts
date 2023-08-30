import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtelaExternaComponent } from './subtela-externa.component';

describe('SubtelaExternaComponent', () => {
  let component: SubtelaExternaComponent;
  let fixture: ComponentFixture<SubtelaExternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubtelaExternaComponent]
    });
    fixture = TestBed.createComponent(SubtelaExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
