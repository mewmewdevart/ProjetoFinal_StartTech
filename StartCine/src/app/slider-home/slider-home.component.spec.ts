import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHomeComponent } from './slider-home.component';

describe('SliderHomeComponent', () => {
  let component: SliderHomeComponent;
  let fixture: ComponentFixture<SliderHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderHomeComponent]
    });
    fixture = TestBed.createComponent(SliderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
