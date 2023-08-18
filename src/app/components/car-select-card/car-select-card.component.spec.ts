import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelectCardComponent } from './car-select-card.component';

describe('CarSelectCardComponent', () => {
  let component: CarSelectCardComponent;
  let fixture: ComponentFixture<CarSelectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarSelectCardComponent]
    });
    fixture = TestBed.createComponent(CarSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
