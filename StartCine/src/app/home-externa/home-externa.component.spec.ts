import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExternaComponent } from './home-externa.component';

describe('HomeExternaComponent', () => {
  let component: HomeExternaComponent;
  let fixture: ComponentFixture<HomeExternaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeExternaComponent]
    });
    fixture = TestBed.createComponent(HomeExternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
