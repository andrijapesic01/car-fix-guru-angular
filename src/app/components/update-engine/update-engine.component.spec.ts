import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEngineComponent } from './update-engine.component';

describe('UpdateEngineComponent', () => {
  let component: UpdateEngineComponent;
  let fixture: ComponentFixture<UpdateEngineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEngineComponent]
    });
    fixture = TestBed.createComponent(UpdateEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
