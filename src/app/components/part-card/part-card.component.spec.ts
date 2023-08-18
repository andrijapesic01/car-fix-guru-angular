import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartCardComponent } from './part-card.component';

describe('PartCardComponent', () => {
  let component: PartCardComponent;
  let fixture: ComponentFixture<PartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartCardComponent]
    });
    fixture = TestBed.createComponent(PartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
