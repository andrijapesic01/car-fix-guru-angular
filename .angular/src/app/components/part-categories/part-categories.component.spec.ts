import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartCategoriesComponent } from './part-categories.component';

describe('PartCategoriesComponent', () => {
  let component: PartCategoriesComponent;
  let fixture: ComponentFixture<PartCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartCategoriesComponent]
    });
    fixture = TestBed.createComponent(PartCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
