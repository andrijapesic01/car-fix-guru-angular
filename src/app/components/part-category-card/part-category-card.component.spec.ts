import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartCategoryCardComponent } from './part-category-card.component';

describe('PartCategoryCardComponent', () => {
  let component: PartCategoryCardComponent;
  let fixture: ComponentFixture<PartCategoryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartCategoryCardComponent]
    });
    fixture = TestBed.createComponent(PartCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
