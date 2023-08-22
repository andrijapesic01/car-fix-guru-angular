import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEngineComponent } from './add-engine.component';

describe('AddEngineComponent', () => {
  let component: AddEngineComponent;
  let fixture: ComponentFixture<AddEngineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEngineComponent]
    });
    fixture = TestBed.createComponent(AddEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
