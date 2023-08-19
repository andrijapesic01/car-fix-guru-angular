import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      city: [''],
      country: [''],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log("Registration form submitted:", this.registrationForm.value);
      // Additional logic for form submission
    }
  }

  onClick() {
    console.log("Sign up btn clicked!");
    if (this.registrationForm.valid) {
      console.log("Form is valid. Submitting...");
      // Add your form submission logic here
    } else {
      console.log("Form is not valid. Cannot submit.");
    }
  }
}
