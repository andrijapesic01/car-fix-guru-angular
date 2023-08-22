import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransmissionComponent } from './add-transmission.component';

describe('AddTransmissionComponent', () => {
  let component: AddTransmissionComponent;
  let fixture: ComponentFixture<AddTransmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransmissionComponent]
    });
    fixture = TestBed.createComponent(AddTransmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
